import { useEffect, useState } from 'react'

// Each palette shows its own background and accent in the swatch.
const PALETTES = [
  { id: 'amber', name: 'Amber', bg: '#0f1217', dot: '#e9b26b' },
  { id: 'ocean', name: 'Ocean', bg: '#0b1622', dot: '#5cc8e0' },
  { id: 'rose', name: 'Rose', bg: '#141016', dot: '#e88aa8' },
  { id: 'light', name: 'Light', bg: '#f5f6f8', dot: '#1f4e8c' },
]

function ThemeSwitcher() {
  const [palette, setPalette] = useState(() => {
    try { return localStorage.getItem('palette') || 'amber' } catch { return 'amber' }
  })
  useEffect(() => {
    const root = document.documentElement
    if (palette === 'amber') root.removeAttribute('data-palette')
    else root.setAttribute('data-palette', palette)
    try { localStorage.setItem('palette', palette) } catch { /* storage blocked */ }
  }, [palette])
  const current = PALETTES.find((p) => p.id === palette) || PALETTES[0]
  return (
    <div className="palette" role="group" aria-label="Color theme">
      <span className="palette-label">{current.name}</span>
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          className="swatch"
          style={{ background: p.bg }}
          aria-pressed={palette === p.id}
          aria-label={`${p.name} theme`}
          title={p.name}
          onClick={() => setPalette(p.id)}
        >
          <span style={{ background: p.dot }} />
        </button>
      ))}
    </div>
  )
}
import { profile, direction, communityGoal, stats, skills, experience, projects, education, articles, certificates } from './data.js'
import photo from './assets/thushan.jpg'

const NAV = [
  ['about', 'About'],
  ['direction', 'Direction'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['writing', 'Writing'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

function CopyButton({ value, label }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {
      setDone(false)
    }
  }
  return (
    <button type="button" className="copy" onClick={copy} aria-label={`Copy ${label}`}>
      {done ? 'Copied' : 'Copy'}
    </button>
  )
}

function Section({ id, label, title, children }) {
  return (
    <section id={id} className="section">
      <header className="section-head">
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  )
}

const ARTICLES_SHOWN = 2

export default function App() {
  const { contact } = profile
  const [allArticles, setAllArticles] = useState(false)
  const visibleArticles = allArticles ? articles : articles.slice(0, ARTICLES_SHOWN)
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand">TJ<span>.</span></a>
          <ul>
            {NAV.map(([id, text]) => (
              <li key={id}><a href={`#${id}`}>{text}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="wrap" id="top">
        <section className="hero">
          <div className="hero-main">
            <div className="hero-text">
              <p className="hero-kicker">
                <span className="dot" aria-hidden="true"></span>
                {profile.role} · {profile.location}
              </p>
              <h1>{profile.name}</h1>
              <p className="hero-focus">{profile.focus}</p>
              <p className="hero-summary">{profile.summary}</p>
              <div className="hero-actions">
                <a className="btn primary" href={`mailto:${contact.email}`}>Get in touch</a>
                <a className="btn" href={contact.cv} download>Keep my CV <span aria-hidden="true">↓</span></a>
                <a className="btn" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="btn" href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="btn" href={contact.medium} target="_blank" rel="noreferrer">Medium</a>
              </div>
            </div>
            <figure className="portrait">
              <img src={photo} alt={`Portrait of ${profile.name}`} width="720" height="900" />
            </figure>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section id="about" label="About" title="Backend engineer, end to end">
          <div className="about">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>

        <Section id="direction" label="Career direction" title="Where I am heading">
          <div className="direction">
            {direction.map((d, i) => (
              <article key={d.goal} className="track">
                <span className="track-tag mono">{i === 0 ? 'Main goal' : 'Second track'}</span>
                <h3>{d.goal}</h3>
                <p className="track-lead">{d.lead}</p>
                <div className="track-cols">
                  <div>
                    <h4>{d.nowLabel || 'Doing now'}</h4>
                    <ul>{d.now.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div>
                    <h4>Building toward</h4>
                    <ul>{d.next.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                </div>
                {d.learningFrom && (
                  <div className="learning">
                    <h4>Learning from</h4>
                    <ul>
                      {d.learningFrom.map((m) => (
                        <li key={m.name}>
                          <a href={m.url} target="_blank" rel="noreferrer">{m.name}</a>
                          <span className="muted"> · {m.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {d.tools && (
                  <ul className="tags track-tools">
                    {d.tools.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>
          <aside className="community">
            <div className="community-head">
              <span className="track-tag mono">Long-term goal</span>
              <h3>{communityGoal.goal}</h3>
            </div>
            <p className="muted">{communityGoal.text}</p>
            <ul className="tags">
              {communityGoal.steps.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </aside>
        </Section>

        <Section id="experience" label="Experience" title="Where I have worked">
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job">
                <div className="job-meta">
                  <span className="mono">{job.period}</span>
                  <span className="muted">{job.place}</span>
                </div>
                <div className="job-body">
                  <h3>{job.title} <span className="at">at</span> {job.company}</h3>
                  <p className="job-sub">
                    <span className="chip">{job.domain}</span>
                    {job.via && <span className="muted">{job.via}</span>}
                  </p>
                  <ul>
                    {job.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" label="Projects" title="Things I have helped build">
          <div className="projects">
            {projects.map((p) => (
              <article key={p.name} className="project">
                <div className="project-top">
                  <span className="mono muted">{p.period}</span>
                  <span className="kind">{p.kind}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="project-org">{p.org}</p>
                <p className="project-text">{p.text}</p>
                <ul className="tags">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="writing" label="Writing" title="Articles on Medium">
          <ul className="articles" id="article-list">
            {visibleArticles.map((a) => (
              <li key={a.url}>
                <a href={a.url} target="_blank" rel="noreferrer" className="article">
                  <span className="mono muted">{a.date}</span>
                  <div className="article-body">
                    <span className="kind">{a.topic}</span>
                    <h3>{a.title}</h3>
                    <p className="muted">{a.text}</p>
                  </div>
                  <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="more-row">
            {articles.length > ARTICLES_SHOWN && (
              <button
                type="button"
                className="btn"
                aria-expanded={allArticles}
                aria-controls="article-list"
                onClick={() => setAllArticles((v) => !v)}
              >
                {allArticles ? 'Show less' : `Show all ${articles.length} articles`}
              </button>
            )}
            <a className="text-link" href={contact.medium} target="_blank" rel="noreferrer">Read on Medium ↗</a>
          </div>
        </Section>

        <Section id="skills" label="Skills" title="Tools I use every day">
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skill-row">
                <h3>{s.group}</h3>
                <ul className="tags">
                  {s.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="education" label="Education & certificates" title="Study">
          <ul className="edu">
            {education.map((e) => (
              <li key={e.school + e.degree}>
                <span className="mono muted">{e.period}</span>
                <div>
                  <h3>{e.degree}</h3>
                  <p className="muted">{e.school} · {e.place}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="sub-head">Certificates</h3>
          <ul className="certs">
            {certificates.map((c) => (
              <li key={c.name} className="cert">
                <div className="cert-body">
                  <h4>{c.name}</h4>
                  <p className="muted">{c.issuer} · <span className="mono">{c.date}</span></p>
                </div>
                {c.url && (
                  <a className="text-link" href={c.url} target="_blank" rel="noreferrer" aria-label={`View credential: ${c.name}`}>Credential ↗</a>
                )}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" label="Contact" title="Let’s talk">
          <p className="contact-lead">
            Open to senior backend and Java roles in the Helsinki area. The quickest way to reach me is email.
          </p>
          <div className="cv-card">
            <div className="cv-icon" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <div className="cv-text">
              <h3>Want to keep my CV on file?</h3>
              <p className="muted">Here you go. A PDF copy to save for later or share with your team.</p>
            </div>
            <a className="btn primary" href={contact.cv} download>Save a copy <span aria-hidden="true">↓</span></a>
          </div>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="eyebrow">Email</span>
              <a href={`mailto:${contact.email}`} className="contact-value">{contact.email}</a>
              <CopyButton value={contact.email} label="email" />
            </div>
            <div className="contact-item">
              <span className="eyebrow">Phone</span>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact-value">{contact.phone}</a>
              <CopyButton value={contact.phone} label="phone number" />
            </div>
            <div className="contact-item">
              <span className="eyebrow">LinkedIn</span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-value">in/thushan-jayasundara</a>
            </div>
            <div className="contact-item">
              <span className="eyebrow">GitHub</span>
              <a href={contact.github} target="_blank" rel="noreferrer" className="contact-value">thushanJayasundara</a>
            </div>
            <div className="contact-item">
              <span className="eyebrow">Medium</span>
              <a href={contact.medium} target="_blank" rel="noreferrer" className="contact-value">@thushanjayasundara96</a>
            </div>
          </div>
        </Section>
      </main>

      <ThemeSwitcher />

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="mono muted">Built with React</span>
        </div>
      </footer>
    </>
  )
}
