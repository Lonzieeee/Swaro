import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineHeart,
  HiOutlinePresentationChartLine,
  HiOutlineUsers,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import "./Navbar.css";

type ServiceItem = {
  label: string;
  path: string;
  description: string;
  Icon: IconType;
};

const SERVICES: readonly ServiceItem[] = [
  {
    label: "Counselling & Mediation",
    path: "/services/counselling",
    description: "General, pre-marital, marital, family and youth counselling alongside professional conflict resolution and civil mediation services.",
    Icon: HiOutlineChatBubbleLeftRight,
  },
  {
    label: "Training & Capacity Building",
    path: "/services/training",
    description: "Human development, leadership, management and administration training alongside short courses in personal and professional development.",
    Icon: HiOutlinePresentationChartLine,
  },
  {
    label: "Education & Career Development",
    path: "/services/education",
    description: "Curriculum development, career guidance, CV and resume writing, and educational mentorship to unlock individual potential.",
    Icon: HiOutlineAcademicCap,
  },
  {
    label: "Community Empowerment",
    path: "/services/community",
    description: "Women, gender and youth empowerment programs alongside church and faith-based counselling for stronger, more resilient communities.",
    Icon: HiOutlineUsers,
  },
  {
    label: "Research & Consultancy",
    path: "/services/research",
    description: "Applied research, data collection, monitoring and evaluation, grant proposal writing and resource mobilization for sustainable impact.",
    Icon: HiOutlineClipboardDocumentList,
  },
  {
    label: "Health & Lifestyle Development",
    path: "/services/health",
    description: "Nutrition education in lifestyle diseases and community health awareness programs that promote holistic well-being and quality of life.",
    Icon: HiOutlineHeart,
  },
] as const;

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", hasDropdown: true }, // No path, just dropdown
  { label: "Our Approach", path: "/approach" },
  { label: "Partnerships", path: "/partnerships" },
] as const;

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const linkActive = (path: string) =>
    path === "/services" ? pathname.startsWith("/services") : pathname === path;

  const closeAllMenus = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  };

  const closeDropdownIfOutside = (nextTarget: EventTarget | null) => {
    if (nextTarget instanceof Node && dropdownRef.current?.contains(nextTarget)) return;
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar" data-scrolled={scrolled} aria-label="Main">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" onClick={closeAllMenus}>
            <span className="navbar__logo-main">SWARO</span>
            <span className="navbar__logo-sub">Consulty Services</span>
          </Link>

          <div className="navbar__desktop">
            <div className="desktop-links">
              {NAV_LINKS.map((item) =>
                "hasDropdown" in item && item.hasDropdown ? (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="navbar__dropdown-wrap"
                    data-open={dropdownOpen}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onFocusCapture={() => setDropdownOpen(true)}
                    onBlurCapture={(e) => closeDropdownIfOutside(e.relatedTarget)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setDropdownOpen(false);
                    }}
                  >
                    <button
                      type="button"
                      className={`nav-link${dropdownOpen ? " nav-link--active" : ""}`}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      aria-controls="services-mega-menu"
                      onClick={() => setDropdownOpen((open) => !open)}
                    >
                      {item.label}
                      <ChevronDown className="navbar__chevron" />
                    </button>

                    <div
                      id="services-mega-menu"
                      className="navbar__dropdown"
                      aria-hidden={!dropdownOpen}
                    >
                      <div className="navbar__dropdown-inner">
                        <div className="navbar__dropdown-header">
                          <p className="navbar__dropdown-heading">Our Services</p>
                          <p className="navbar__dropdown-subheading">
                            Practical, people-centered solutions across six core areas.
                          </p>
                        </div>

                        <div className="navbar__dropdown-grid">
                          {SERVICES.map((service) => {
                            const { Icon } = service;
                            return (
                              <Link key={service.path} to={service.path} className="navbar__dropdown-card" onClick={() => setDropdownOpen(false)}>
                                <span className="navbar__dropdown-iconWrap" aria-hidden>
                                  <Icon className="navbar__dropdown-icon" size={22} />
                                </span>
                                <span className="navbar__dropdown-copy">
                                  <span className="navbar__dropdown-title">{service.label}</span>
                                  <span className="navbar__dropdown-description">{service.description}</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`nav-link${linkActive(item.path) ? " nav-link--active" : ""}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>
            <Link to="/contact" className="cta-desktop">
              Book a Consultation
            </Link>
          </div>

          <button
            type="button"
            className="hamburger"
            data-open={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="hamburger-line hamburger-line--top" />
            <span className="hamburger-line hamburger-line--middle" />
            <span className="hamburger-line hamburger-line--bottom" />
          </button>
        </div>
      </nav>

      <div className="navbar__drawer" data-open={mobileOpen} id="mobile-nav">
        <div className="navbar__drawer-inner">
          {NAV_LINKS.map((item) =>
            "hasDropdown" in item && item.hasDropdown ? (
              <div key={item.label} className="navbar__mobile-services" data-open={mobileServicesOpen}>
                <button
                  type="button"
                  className="navbar__mobile-link"
                  onClick={() => setMobileServicesOpen((o) => !o)}
                  aria-expanded={mobileServicesOpen}
                >
                  {item.label}
                  <ChevronDown className="navbar__mobile-chevron" />
                </button>
                {mobileServicesOpen && (
                  <div className="navbar__mobile-sub">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileServicesOpen(false);
                        }}
                      >
                        <span className="navbar__dropdown-dot" />
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.path}
                className={`navbar__mobile-link${linkActive(item.path) ? " navbar__mobile-link--active" : ""}`}
                onClick={closeAllMenus}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link to="/contact" className="navbar__mobile-cta" onClick={() => setMobileOpen(false)}>
            Book a Consultation
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          className="navbar__overlay"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </>
  );
}
