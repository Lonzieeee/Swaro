import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  HiArrowPath,
  HiCalendarDays,
  HiChatBubbleLeftRight,
  HiEnvelope,
  HiPhone,
  HiClipboardDocumentList,
  HiXMark,
} from 'react-icons/hi2'
import { FaWhatsapp } from 'react-icons/fa6'
import { site } from '../../constants/swaroData'
import './SupportChatWidget.css'

const STORAGE_KEY = 'swaro_support_chat_v1'
const TEASER_DISMISSED_KEY = 'swaro_support_teaser_dismissed_v1'

const WHATSAPP_E164 = '254711966258'
const WHATSAPP_PREFILL =
  'Hello Swaro Institute, I would like to ask about counselling or training services.'

function whatsappHref(): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
}

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits ? `tel:+${digits}` : `tel:${phone}`
}

function newMsgId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function formatChatTime(d: Date): string {
  return d.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
}

function typingDelayMs(): number {
  if (typeof window === 'undefined') return 950
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0
  return 700 + Math.floor(Math.random() * 401)
}

function farewellCloseDelayMs(): number {
  if (typeof window === 'undefined') return 5500
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 3500
  return 5500
}

function readTeaserDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(TEASER_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

function persistTeaserDismissed(): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(TEASER_DISMISSED_KEY, '1')
  } catch {
    /* private mode */
  }
}

type BotSource = { kind: 'greeting' } | { kind: 'farewell' } | { kind: 'quick'; quickId: string }

type ChatMessage =
  | { id: string; role: 'user'; text: string; time: string }
  | { id: string; role: 'bot'; time: string; source: BotSource }

type QuickItem = {
  id: string
  question: string
  answer: (opts: { onNavigate: () => void }) => ReactNode
}

type PersistedBotSource = { kind: 'greeting' } | { kind: 'farewell' } | { kind: 'quick'; quickId: string }

type PersistedMessage =
  | { id: string; role: 'user'; text: string; time: string }
  | { id: string; role: 'bot'; time: string; source: PersistedBotSource }

type PersistedStateV1 = {
  v: 1
  messages: PersistedMessage[]
  usedQuickIds: string[]
}

type PersistedStateV2 = {
  v: 2
  messages: PersistedMessage[]
  usedQuickIds: string[]
  quickSheetOpen: boolean
}

type PersistedState = PersistedStateV1 | PersistedStateV2

function isValidQuickId(id: string): boolean {
  return SUPPORT_QUICK.some((q) => q.id === id)
}

function loadPersisted(): { messages: ChatMessage[]; usedQuickIds: Set<string>; quickSheetOpen: boolean } {
  if (typeof window === 'undefined')
    return { messages: [], usedQuickIds: new Set(), quickSheetOpen: true }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { messages: [], usedQuickIds: new Set(), quickSheetOpen: true }
    const data = JSON.parse(raw) as Partial<PersistedState> & { messages?: unknown; usedQuickIds?: unknown; v?: number; quickSheetOpen?: unknown }
    if (!Array.isArray(data.messages)) return { messages: [], usedQuickIds: new Set(), quickSheetOpen: true }

    const used = new Set(Array.isArray(data.usedQuickIds) ? data.usedQuickIds.filter(isValidQuickId) : [])
    const messages: ChatMessage[] = []
    for (const m of data.messages) {
      if (!m || typeof m.id !== 'string' || typeof m.time !== 'string') continue
      if (m.role === 'user' && typeof m.text === 'string') {
        messages.push({ id: m.id, role: 'user', text: m.text, time: m.time })
        continue
      }
      if (m.role === 'bot' && m.source?.kind === 'greeting') {
        messages.push({ id: m.id, role: 'bot', time: m.time, source: { kind: 'greeting' } })
        continue
      }
      if (m.role === 'bot' && m.source?.kind === 'farewell') {
        messages.push({ id: m.id, role: 'bot', time: m.time, source: { kind: 'farewell' } })
        continue
      }
      if (m.role === 'bot' && m.source?.kind === 'quick' && typeof m.source.quickId === 'string' && isValidQuickId(m.source.quickId)) {
        messages.push({ id: m.id, role: 'bot', time: m.time, source: { kind: 'quick', quickId: m.source.quickId } })
      }
    }

    let quickSheetOpen = true
    if (data.v === 2 && typeof data.quickSheetOpen === 'boolean') {
      quickSheetOpen = data.quickSheetOpen
    } else {
      quickSheetOpen = used.size === 0
    }

    return { messages, usedQuickIds: used, quickSheetOpen }
  } catch {
    return { messages: [], usedQuickIds: new Set(), quickSheetOpen: true }
  }
}

function savePersisted(messages: ChatMessage[], usedQuickIds: Set<string>, quickSheetOpen: boolean): void {
  if (typeof window === 'undefined') return
  try {
    const payload: PersistedStateV2 = {
      v: 2,
      usedQuickIds: [...usedQuickIds],
      quickSheetOpen,
      messages: messages.map((m) => {
        if (m.role === 'user') {
          return { id: m.id, role: 'user', text: m.text, time: m.time }
        }
        return { id: m.id, role: 'bot', time: m.time, source: m.source }
      }),
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    /* quota or private mode */
  }
}

function contactTeamAnswer({ onNavigate }: { onNavigate: () => void }): ReactNode {
  return (
    <div className="supportChat__answer">
      <p>Here are the best ways to reach us; pick what works for you.</p>
      <div className="supportChat__contactCards">
        <Link to="/book-session" className="supportChat__contactCard" onClick={onNavigate}>
          <HiCalendarDays aria-hidden className="supportChat__contactCardIcon" />
          <span className="supportChat__contactCardText">Book counselling</span>
        </Link>
        <Link to="/contact" className="supportChat__contactCard" onClick={onNavigate}>
          <HiClipboardDocumentList aria-hidden className="supportChat__contactCardIcon" />
          <span className="supportChat__contactCardText">Contact form</span>
        </Link>
        <a href={whatsappHref()} className="supportChat__contactCard" rel="noopener noreferrer" target="_blank">
          <FaWhatsapp aria-hidden className="supportChat__contactCardIcon supportChat__contactCardIcon--wa" />
          <span className="supportChat__contactCardText">WhatsApp</span>
        </a>
        <a href={`mailto:${site.contactEmail}`} className="supportChat__contactCard">
          <HiEnvelope aria-hidden className="supportChat__contactCardIcon" />
          <span className="supportChat__contactCardText">{site.contactEmail}</span>
        </a>
        <a href={telHref(site.phone)} className="supportChat__contactCard">
          <HiPhone aria-hidden className="supportChat__contactCardIcon" />
          <span className="supportChat__contactCardText">{site.phone}</span>
        </a>
      </div>
      <p className="supportChat__answerNote">
        For urgent medical or safety emergencies, contact <strong>local emergency services</strong>.
      </p>
    </div>
  )
}

const SUPPORT_QUICK: readonly QuickItem[] = [
  {
    id: 'book',
    question: 'How do I book counselling?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          Use <strong>Book a Counselling Session</strong>: you fill in your details on the site, then continue to{' '}
          <strong>WhatsApp</strong> on {site.phone} to confirm the same flow as our main booking page.
        </p>
        <Link to="/book-session" className="supportChat__inlineLink" onClick={onNavigate}>
          Open Book Session
        </Link>
      </div>
    ),
  },
  {
    id: 'services',
    question: 'What services do you offer?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          Swaro Institute lists <strong>six service areas</strong> on the Services page ; counselling &amp; mediation,
          training &amp; capacity building, education &amp; career development, community empowerment, research &amp;
          consultancy, and health &amp; lifestyle development.
        </p>
        <Link to="/services" className="supportChat__inlineLink" onClick={onNavigate}>
          View Services
        </Link>
      </div>
    ),
  },
  {
    id: 'programmes',
    question: 'Do you have courses or programmes?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          Featured <strong>counselling programmes</strong> are linked from the home page. Each programme has a{' '}
          <strong>course overview</strong> and a fuller <strong>counselling service</strong> page with details.
        </p>
        <Link to="/#featured-programs" className="supportChat__inlineLink" onClick={onNavigate}>
          Featured programmes on Home
        </Link>
      </div>
    ),
  },
  {
    id: 'format',
    question: 'Online or in-person sessions?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          When you <strong>book a counselling session</strong>, the form asks for your <strong>preferred mode</strong>{' '}
          (for example in person or online). If you are unsure what fits best, share that in your message on{' '}
          <strong>WhatsApp</strong> after submitting the form.
        </p>
        <Link to="/book-session" className="supportChat__inlineLink" onClick={onNavigate}>
          Book a session
        </Link>
      </div>
    ),
  },
  {
    id: 'fees',
    question: 'How do fees or pricing work?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          Pricing depends on the <strong>service</strong>, <strong>format</strong>, and <strong>scope</strong> of work.
          <strong> Book Session</strong> for counselling so the team can respond with next steps.
        </p>
        <Link to="/contact" className="supportChat__inlineLink" onClick={onNavigate}>
          Contact
        </Link>
      </div>
    ),
  },
  {
    id: 'location',
    question: 'Where is Swaro based?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          <strong>Swaro Institute is based in Nairobi, Kenya.</strong>
        </p>
        <p>
          We also serve people across Kenya and around the world through <strong>online sessions</strong>, so you can
          access counselling or consultation support even if you are not physically in Nairobi.
        </p>
        <p>
          For in-person visits, programme venues, or logistics, use <strong>Contact</strong> and the team will guide you
          on the best next step.
        </p>
        <Link to="/contact" className="supportChat__inlineLink" onClick={onNavigate}>
          Contact us
        </Link>
      </div>
    ),
  },
  {
    id: 'consult',
    question: 'How do I book a consultation?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          For a tailored <strong>consultation</strong> (institutions, training, research, partnerships), use the{' '}
          <strong>Contact</strong> page and share your goals then our team will get back to you.
        </p>
        <Link to="/contact" className="supportChat__inlineLink" onClick={onNavigate}>
          Go to Contact
        </Link>
      </div>
    ),
  },
  {
    id: 'partners',
    question: 'Can we partner with Swaro?',
    answer: ({ onNavigate }) => (
      <div className="supportChat__answer">
        <p>
          Yes. The <strong>Partnerships</strong> page describes how NGOs, government, universities, faith groups and
          businesses work with us on research, training, M&amp;E and community impact in Kenya.
        </p>
        <Link to="/partnerships" className="supportChat__inlineLink" onClick={onNavigate}>
          Partnerships
        </Link>
      </div>
    ),
  },
  {
    id: 'contact',
    question: 'How do I reach your team?',
    answer: (opts) => contactTeamAnswer(opts),
  },
]

const CONTACT_QUICK_ITEM = SUPPORT_QUICK.find((q) => q.id === 'contact')!

function farewellBody(): ReactNode {
  return (
    <div className="supportChat__answer supportChat__answer--farewell">
      <p>
        <strong>Take care 👋</strong>
      </p>
      <p>Thank you for stopping by Swaro Institute. Whenever you are ready, we will be here. Have a peaceful day 💛</p>
    </div>
  )
}

function greetingBody(): ReactNode {
  return (
    <div className="supportChat__answer">
      <p>
        <strong>Hi 👋 — welcome to Swaro Institute.</strong> We are glad you are here 💛
      </p>
      <p>
        I am a <strong>quick help guide</strong> (not a counsellor). T
      </p>
      <p className="supportChat__answerPrivacy">
        This chat is stays in your browser for this visit (until you
        clear it or use &quot;Start over&quot;).
      </p>
      <p>
        After each reply you can <strong>ask another topic</strong>, <strong>open WhatsApp</strong>, or see{' '}
        <strong>all contact options</strong> — whatever feels easiest for you.
      </p>
    </div>
  )
}

function renderBotBody(source: BotSource, onNavigate: () => void): ReactNode {
  if (source.kind === 'greeting') return greetingBody()
  if (source.kind === 'farewell') return farewellBody()
  const item = SUPPORT_QUICK.find((q) => q.id === source.quickId)
  if (!item) return <p className="supportChat__answer">That topic is no longer available — try another suggestion.</p>
  return item.answer({ onNavigate })
}

function TypingIndicator() {
  return (
    <div className="supportChat__row supportChat__row--bot">
      <div className="supportChat__avatarWrap" aria-hidden>
        <img
          src={site.brandLogoUrl}
          alt=""
          className="supportChat__avatarImg"
          width={36}
          height={36}
          decoding="async"
        />
      </div>
      <div className="supportChat__typingBubble">
        <span className="supportChat__typingDot" />
        <span className="supportChat__typingDot" />
        <span className="supportChat__typingDot" />
      </div>
    </div>
  )
}

const initialPersisted = loadPersisted()

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialPersisted.messages)
  const [usedQuickIds, setUsedQuickIds] = useState<Set<string>>(() => initialPersisted.usedQuickIds)
  const [quickSheetOpen, setQuickSheetOpen] = useState(() => initialPersisted.quickSheetOpen)
  const [typing, setTyping] = useState(false)
  const [teaserVisible, setTeaserVisible] = useState(() => !readTeaserDismissed())
  const rootRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const farewellCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const declineLockRef = useRef(false)
  const prevOpenRef = useRef(false)
  const titleId = useId()
  const panelId = useId()

  const hasFarewell = useMemo(
    () => messages.some((m) => m.role === 'bot' && m.source.kind === 'farewell'),
    [messages],
  )

  const close = useCallback(() => setOpen(false), [])

  const dismissTeaser = useCallback(() => {
    persistTeaserDismissed()
    setTeaserVisible(false)
  }, [])

  const openChatFromTeaser = useCallback(() => {
    persistTeaserDismissed()
    setTeaserVisible(false)
    setOpen(true)
  }, [])

  useEffect(() => {
    if (open) return
    declineLockRef.current = false
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }
    if (farewellCloseTimerRef.current) {
      clearTimeout(farewellCloseTimerRef.current)
      farewellCloseTimerRef.current = null
    }
    setTyping(false)
  }, [open])

  useEffect(() => {
    if (open) {
      setTeaserVisible(false)
      return
    }
    setTeaserVisible(!readTeaserDismissed())
  }, [open])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
      if (farewellCloseTimerRef.current) clearTimeout(farewellCloseTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (typing) return
    savePersisted(messages, usedQuickIds, quickSheetOpen)
  }, [messages, usedQuickIds, quickSheetOpen, typing])

  useEffect(() => {
    if (!open) return
    if (messages.length > 0) return
    const now = formatChatTime(new Date())
    setMessages([{ id: newMsgId(), role: 'bot', time: now, source: { kind: 'greeting' } }])
  }, [open, messages.length])

  useEffect(() => {
    if (!open) return
    const el = threadRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, typing, open, quickSheetOpen, hasFarewell])

  useEffect(() => {
    if (open) {
      const id = window.requestAnimationFrame(() => {
        closeRef.current?.focus()
      })
      prevOpenRef.current = true
      return () => window.cancelAnimationFrame(id)
    }
    if (prevOpenRef.current) {
      window.requestAnimationFrame(() => {
        launcherRef.current?.focus()
      })
    }
    prevOpenRef.current = false
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const onNavigate = useCallback(() => {
    close()
  }, [close])

  const startOver = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }
    if (farewellCloseTimerRef.current) {
      clearTimeout(farewellCloseTimerRef.current)
      farewellCloseTimerRef.current = null
    }
    declineLockRef.current = false
    setTyping(false)
    setUsedQuickIds(new Set())
    setQuickSheetOpen(true)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    const now = formatChatTime(new Date())
    setMessages([{ id: newMsgId(), role: 'bot', time: now, source: { kind: 'greeting' } }])
    window.requestAnimationFrame(() => {
      closeRef.current?.focus()
    })
  }, [])

  const chooseQuick = useCallback(
    (item: QuickItem) => {
      if (farewellCloseTimerRef.current) {
        clearTimeout(farewellCloseTimerRef.current)
        farewellCloseTimerRef.current = null
      }
      declineLockRef.current = false
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
        typingTimerRef.current = null
      }

      setTyping(false)
      setQuickSheetOpen(false)

      setUsedQuickIds((prev) => new Set(prev).add(item.id))
      const userTime = formatChatTime(new Date())
      setMessages((prev) => [...prev, { id: newMsgId(), role: 'user', text: item.question, time: userTime }])

      const delay = typingDelayMs()

      if (delay === 0) {
        const botTime = formatChatTime(new Date())
        setMessages((prev) => [
          ...prev,
          { id: newMsgId(), role: 'bot', time: botTime, source: { kind: 'quick', quickId: item.id } },
        ])
        return
      }

      setTyping(true)
      typingTimerRef.current = setTimeout(() => {
        typingTimerRef.current = null
        setTyping(false)
        const botTime = formatChatTime(new Date())
        setMessages((prev) => [
          ...prev,
          { id: newMsgId(), role: 'bot', time: botTime, source: { kind: 'quick', quickId: item.id } },
        ])
      }, delay)
    },
    [],
  )

  const declineMoreHelp = useCallback(() => {
    if (typing || declineLockRef.current) return
    declineLockRef.current = true
    if (farewellCloseTimerRef.current) {
      clearTimeout(farewellCloseTimerRef.current)
      farewellCloseTimerRef.current = null
    }
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = null
    }

    setTyping(false)
    setQuickSheetOpen(false)
    const userTime = formatChatTime(new Date())
    setMessages((prev) => [...prev, { id: newMsgId(), role: 'user', text: 'No thanks', time: userTime }])

    const appendFarewellAndScheduleClose = () => {
      const botTime = formatChatTime(new Date())
      setMessages((prev) => [
        ...prev,
        { id: newMsgId(), role: 'bot', time: botTime, source: { kind: 'farewell' } },
      ])
      farewellCloseTimerRef.current = setTimeout(() => {
        farewellCloseTimerRef.current = null
        close()
      }, farewellCloseDelayMs())
    }

    const delay = typingDelayMs()
    if (delay === 0) {
      appendFarewellAndScheduleClose()
      return
    }

    setTyping(true)
    typingTimerRef.current = setTimeout(() => {
      typingTimerRef.current = null
      setTyping(false)
      appendFarewellAndScheduleClose()
    }, delay)
  }, [close, typing])

  const remainingQuick = SUPPORT_QUICK.filter((q) => !usedQuickIds.has(q.id))
  const showContactNudge = !open && !usedQuickIds.has('contact')

  const showTeaser = teaserVisible && !open

  return (
    <div ref={rootRef} className="supportChat">
      <div className="supportChat__dock">
        {showTeaser ? (
          <aside className="supportChat__teaser" aria-label="Nice to meet you welcome">
            <span className="supportChat__teaserAccent" aria-hidden />
            <button
              type="button"
              className="supportChat__teaserClose"
              onClick={dismissTeaser}
              aria-label="Dismiss welcome message"
            >
              <HiXMark aria-hidden className="supportChat__teaserCloseIcon" />
            </button>

            <div className="supportChat__teaserHead">
              <div className="supportChat__teaserBrand">
                <div className="supportChat__teaserLogoWrap">
                  <img
                    src={site.brandLogoUrl}
                    alt=""
                    className="supportChat__teaserLogo"
                    width={40}
                    height={40}
                    decoding="async"
                  />
                </div>
              </div>
              <h2 className="supportChat__teaserTitle">
                <span className="supportChat__teaserWaveBadge" aria-hidden>
                  <span className="supportChat__wave">👋</span>
                </span>
                <span className="supportChat__teaserTitleText">Nice to meet you</span>
              </h2>
            </div>

            <p className="supportChat__teaserLead">
              {site.tagline}. Browse common questions in a calm, private space and nothing is sent to our team until you
              choose WhatsApp or contact.
            </p>

            <div className="supportChat__teaserActions">
              <button type="button" className="supportChat__teaserCta" onClick={openChatFromTeaser}>
                <HiChatBubbleLeftRight aria-hidden className="supportChat__teaserCtaIcon" />
                <span>Get started</span>
              </button>
              <button type="button" className="supportChat__teaserLater" onClick={dismissTeaser}>
                Maybe later
              </button>
            </div>
          </aside>
        ) : null}

        <div className="supportChat__rail">
          <div
            id={panelId}
            className="supportChat__panel"
            data-open={open}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-hidden={!open}
            inert={!open ? true : undefined}
          >
        <div className="supportChat__header">
          <div className="supportChat__headerBrand">
            <img
              src={site.brandLogoUrl}
              alt=""
              className="supportChat__headerLogo"
              width={40}
              height={40}
              decoding="async"
            />
            <div className="supportChat__headerText">
              <p id={titleId} className="supportChat__title">
                {site.fullName}
              </p>
              <p className="supportChat__subtitle">
                <span className="supportChat__onlineDot" aria-hidden />
                Support chat
              </p>
            </div>
          </div>
          <div className="supportChat__headerActions">
            <button type="button" className="supportChat__startOver" onClick={startOver} aria-label="Start conversation over">
              <HiArrowPath aria-hidden className="supportChat__startOverIcon" />
              <span>Start over</span>
            </button>
            <button ref={closeRef} type="button" className="supportChat__close" onClick={close} aria-label="Close support panel">
              <HiXMark aria-hidden className="supportChat__closeIcon" />
            </button>
          </div>
        </div>

        <div className="supportChat__body">
          <div ref={threadRef} className="supportChat__thread">
            {messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="supportChat__row supportChat__row--user">
                  <div className="supportChat__bubbleCol">
                    <div className="supportChat__bubble supportChat__bubble--user">
                      <div className="supportChat__bubbleInner">{m.text}</div>
                    </div>
                    <span className="supportChat__time supportChat__time--user">{m.time}</span>
                  </div>
                </div>
              ) : (
                <div key={m.id} className="supportChat__row supportChat__row--bot">
                  <div className="supportChat__avatarWrap" aria-hidden>
                    <img
                      src={site.brandLogoUrl}
                      alt=""
                      className="supportChat__avatarImg"
                      width={36}
                      height={36}
                      decoding="async"
                    />
                  </div>
                  <div className="supportChat__bubbleCol">
                    <div className="supportChat__bubble supportChat__bubble--bot">
                      <div className="supportChat__bubbleInner">{renderBotBody(m.source, onNavigate)}</div>
                    </div>
                    <span className="supportChat__time supportChat__time--bot">{m.time}</span>
                  </div>
                </div>
              ),
            )}

            <div className="supportChat__typingSlot" aria-live={typing ? 'polite' : undefined} aria-busy={typing ? 'true' : undefined}>
              {typing ? <TypingIndicator /> : null}
            </div>

            {quickSheetOpen && remainingQuick.length > 0 && !hasFarewell ? (
              <div className="supportChat__quick">
                <p className="supportChat__quickLabel">Suggested</p>
                <ul className="supportChat__quickList">
                  {remainingQuick.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="supportChat__quickBtn"
                        onClick={() => chooseQuick(item)}
                        disabled={typing}
                      >
                        {item.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!quickSheetOpen && remainingQuick.length > 0 && !typing && !hasFarewell ? (
              <div className="supportChat__followUp">
                <p className="supportChat__followUpText">Need anything else? We are here for you 💬</p>
                <div className="supportChat__followUpActions">
                  <button
                    type="button"
                    className="supportChat__followUpBtn supportChat__followUpBtn--secondary"
                    onClick={() => setQuickSheetOpen(true)}
                    disabled={typing}
                  >
                    Ask another question
                  </button>
                  <a
                    className="supportChat__followUpBtn supportChat__followUpBtn--wa"
                    href={whatsappHref()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaWhatsapp aria-hidden className="supportChat__followUpWaIcon" />
                    Chat on WhatsApp
                  </a>
                  {!usedQuickIds.has('contact') ? (
                    <button
                      type="button"
                      className="supportChat__followUpBtn supportChat__followUpBtn--ghost"
                      onClick={() => chooseQuick(CONTACT_QUICK_ITEM)}
                      disabled={typing}
                    >
                      All contact options
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="supportChat__followUpBtn supportChat__followUpBtn--ghost"
                    onClick={declineMoreHelp}
                    disabled={typing}
                  >
                    No thanks
                  </button>
                </div>
              </div>
            ) : null}

            {remainingQuick.length === 0 && usedQuickIds.size > 0 && !typing && !hasFarewell ? (
              <div className="supportChat__followUp supportChat__followUp--end">
                <p className="supportChat__followUpText">
                  That is everything in this quick guide. Want a real person? Message us on WhatsApp anytime 👋
                </p>
                <div className="supportChat__followUpActions">
                  <a
                    className="supportChat__followUpBtn supportChat__followUpBtn--wa"
                    href={whatsappHref()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaWhatsapp aria-hidden className="supportChat__followUpWaIcon" />
                    Open WhatsApp
                  </a>
                  <button
                    type="button"
                    className="supportChat__followUpBtn supportChat__followUpBtn--ghost"
                    onClick={declineMoreHelp}
                    disabled={typing}
                  >
                    No thanks
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

          <button
            ref={launcherRef}
            type="button"
            className="supportChat__launcher"
            data-nudge={showContactNudge ? 'true' : undefined}
            onClick={() => {
              setOpen((prev) => {
                const next = !prev
                if (next) setTeaserVisible(false)
                return next
              })
            }}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? 'Close support chat' : 'Open support chat'}
          >
            {open ? <HiXMark aria-hidden className="supportChat__launcherIcon" /> : <HiChatBubbleLeftRight aria-hidden className="supportChat__launcherIcon" />}
          </button>
        </div>
      </div>
    </div>
  )
}
