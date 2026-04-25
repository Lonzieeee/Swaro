import './LeadConsultants.css'

type Consultant = {
  id: string
  name: string
  title: string
  summary: string
  image: string
  imageAlt: string
  bio: string[]
  coreAreas: string[]
}

const consultants: readonly Consultant[] = [
  {
    id: 'consultant-alice',
    name: 'Prof. Alice Ondigi',
    title: 'Lead Consultant | Human Development & Community Empowerment',
    summary:
      'Specialist in counselling, gender and family wellbeing, and community-based research for sustainable livelihoods. She brings over two decades of leadership in mentoring, participatory research, and translating evidence into practical support for families and communities. Her work consistently connects academic rigor with compassionate field practice, helping organizations design interventions that are ethical, inclusive, and measurable.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Alica.jpeg',
    imageAlt: 'Prof. Alice Ondigi, Lead Consultant at SWARO',
    bio: [
      'Prof. Alice Ondigi is a Professor of Human Development with a PhD from Kenyatta University and MSc and BSc degrees from the University of Minnesota, USA. She currently serves at Kenyatta University in the Department of Community Resource Management.',
      'With over 28 years of academic and leadership experience, she has held senior leadership positions in higher institutions of learning, where she pioneered new academic programmes and strengthened international linkages.',
      'She has over 26 years of research experience and has published and disseminated knowledge at national and international forums. Through this work, she has built strong networks across institutions and communities, organized seminars and key forums, mobilized students and staff for outreach activities, and mentored many people in research, leadership, and community service.',
      'She is highly skilled in research tool development, data collection, analysis, and reporting. She has won competitive research grants, managed large studies, and disseminated findings to stakeholders while upholding privacy and ethical practice.',
      'Prof. Ondigi is an accredited counsellor (KCPA) and certified mediator (Serein Mediation Center). Her expertise spans family and youth counselling, gender empowerment, maternal and reproductive health, nutrition education, research and data-collection training, monitoring and evaluation, and sustainable livelihoods. She has led multiple research consultancies, including for Innovations for Poverty Action (IPA), supervised over 30 postgraduate students, and remains deeply committed to improving community well-being through evidence-based and compassionate interventions.',
    ],
    coreAreas: [
      'Social mentorship',
      'Counselling & Mediation',
      'Health & Nutrition',
      'Community Empowerment',
      'Monitoring & Evaluation',
      'Research & Consultancy',
    ],
  },
  {
    id: 'consultant-samson',
    name: 'Prof. Samson R. Ondigi',
    title: 'Lead Consultant | Education & Institutional Development',
    summary:
      'Expert in curriculum development, teacher mentorship, and institutional capacity building for long-term impact. He combines policy insight, educational leadership, and strategic implementation to strengthen institutions and improve learning outcomes at scale. His consultancy approach emphasizes practical execution, stakeholder alignment, and sustainable systems that continue delivering value beyond project timelines.',
    image: 'https://pub-280c8760758440989f8d553b295d5bd5.r2.dev/Samson.jpeg',
    imageAlt: 'Prof. Samson R. Ondigi, Lead Consultant at SWARO',
    bio: [
      'Prof. Samson Ondigi is a Professor of Social Studies Education and the Executive Dean of the School of Education and Lifelong Learning at Kenyatta University. He holds a PhD from the University of Minnesota, USA, with a double major in Comparative International Development Education and Geography.',
      'He brings over 30 years of experience in curriculum development, teacher mentorship, educational leadership, and ICT integration in pedagogy.',
      'Prof. Ondigi has attracted more than USD 900,000 in research funding and supervised 84 postgraduate students to completion. He has led major consultancy assignments, including development of teacher-education programmes for refugee settings in Kakuma and Dadaab, and advisory work on national curriculum reforms (CBC).',
      'His approach combines innovation, strategic planning, and a strong commitment to building institutional and individual capacity for sustainable development.',
    ],
    coreAreas: [
      'Curriculum Development',
      'Teacher Training',
      'Leadership & Management',
      'Educational Mentorship',
      'Research & Consultancy',
    ],
  },
]

export default function LeadConsultants() {
  return (
    <section
      id="lead-consultants"
      className="leadConsultants"
      aria-labelledby="lead-consultants-heading"
    >
      <div className="leadConsultants__inner">
        <header className="leadConsultants__header">
          <div className="leadConsultants__label">
            The People Behind SWARO
            <span className="leadConsultants__labelUnderline" aria-hidden />
          </div>
          <h2 id="lead-consultants-heading" className="leadConsultants__heading">
            Our Lead <span className="leadConsultants__headingAccent">Consultants</span>
          </h2>
        </header>

        <ul className="leadConsultants__grid" role="list">
          {consultants.map((c) => (
            <li key={c.id} className="leadConsultants__card" role="listitem" tabIndex={0}>
              <img className="leadConsultants__photo" src={c.image} alt={c.imageAlt} loading="lazy" />
              <div className="leadConsultants__namePlate">
                <h3 className="leadConsultants__name">{c.name}</h3>
                <p className="leadConsultants__title">{c.title}</p>
                <p className="leadConsultants__summary">{c.summary}</p>
              </div>
              <div className="leadConsultants__overlay">
                <div className="leadConsultants__overlayContent">
                  <h4 className="leadConsultants__overlayHeading">{c.name}</h4>
                  {c.bio.map((paragraph) => (
                    <p key={paragraph} className="leadConsultants__bio">
                      {paragraph}
                    </p>
                  ))}
                  <p className="leadConsultants__coreAreas">
                    <strong>Core Areas:</strong> {c.coreAreas.join(', ')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
