import { useEffect, useMemo, useState } from 'react'
import { posts } from './posts.jsx'
import { topics } from './topics.js'

// Blog = a learning tree on the left, the selected page on the right.
//   #/blog                               → overview
//   #/blog/<topic>                       → topic overview
//   #/blog/<topic>/<subtopic>            → subtopic overview
//   #/blog/<topic>/<subtopic>/<item>     → article (or a "planned" card)

const SITE = 'Thushan Jayasundara'

const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const topicUrl = (t) => `#/blog/${t.slug}`
const subUrl = (t, s) => `#/blog/${t.slug}/${s.slug}`
const itemUrl = (t, s, i) => `#/blog/${t.slug}/${s.slug}/${i.slug}`
const postUrl = (p) => `#/blog/${p.topic}/${p.subtopic}/${p.slug}`

const findTopic = (slug) => topics.find((t) => t.slug === slug)
const findSub = (topic, slug) => topic?.subtopics.find((s) => s.slug === slug)

// Oldest first inside a subtopic, so a series reads in order.
const postsIn = (topicSlug, subSlug) =>
  posts
    .filter((p) => p.topic === topicSlug && p.subtopic === subSlug)
    .sort((a, b) => a.date.localeCompare(b.date))

// Everything in a subtopic: published posts first, then the roadmap.
const itemsOf = (t, s) => [
  ...postsIn(t.slug, s.slug).map((p) => ({ slug: p.slug, title: p.title, status: 'published', post: p })),
  ...(s.roadmap || []).map((r) => ({ slug: r.slug || slugify(r.title), title: r.title, status: r.status })),
]

function countFor(topic, subs = topic.subtopics) {
  const c = { done: 0, doing: 0, planned: 0 }
  for (const s of subs)
    for (const i of itemsOf(topic, s))
      i.status === 'published' ? c.done++ : i.status === 'in-progress' ? c.doing++ : c.planned++
  c.total = c.done + c.doing + c.planned
  return c
}
function countAll() {
  const c = { done: 0, doing: 0, planned: 0, total: 0 }
  for (const t of topics) {
    const x = countFor(t)
    for (const k in c) c[k] += x[k]
  }
  return c
}

function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `Blog · ${SITE}`
  }, [title])
}

/* ---------- small pieces ---------- */

const STATUS_LABEL = { published: 'Learned', 'in-progress': 'Learning now', planned: 'To learn' }

function StatusIcon({ status }) {
  const glyph = { published: '✓', 'in-progress': '', planned: '' }[status]
  return <span className={`st st-${status}`} aria-label={STATUS_LABEL[status]}>{glyph}</span>
}

function Pill({ status }) {
  return <span className={`pill pill-${status}`}>{STATUS_LABEL[status]}</span>
}

function PostCount({ n }) {
  return <span className="mono muted row-count">{n ? `${n} post${n > 1 ? 's' : ''}` : 'No posts yet'}</span>
}

function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, href]) => (
          <li key={label}>
            {href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ---------- the tree (left) ---------- */

function Tree({ path }) {
  const [a, b, c] = path
  const [open, setOpen] = useState(() => new Set([a, a && b && `${a}/${b}`].filter(Boolean)))
  const [query, setQuery] = useState('')
  const [drawer, setDrawer] = useState(!a) // phones: tree folds away once you pick a page

  // Whatever page is open, its branch is expanded.
  useEffect(() => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (a) next.add(a)
      if (a && b) next.add(`${a}/${b}`)
      return next
    })
    if (a) setDrawer(false)
  }, [a, b, c])

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  // Search keeps a topic if its name, a subtopic or an item matches.
  const q = query.trim().toLowerCase()
  const view = useMemo(() => {
    const hit = (s) => s.toLowerCase().includes(q)
    return topics
      .map((t) => {
        const tHit = !q || hit(t.name)
        const subs = t.subtopics
          .map((s) => {
            const sHit = tHit || hit(s.name)
            const items = itemsOf(t, s).filter((i) => sHit || hit(i.title))
            return items.length || sHit ? { s, items } : null
          })
          .filter(Boolean)
        return subs.length || tHit ? { t, subs } : null
      })
      .filter(Boolean)
  }, [q])

  const all = countAll()
  const here = findTopic(a)
  const where = here ? [here.name, findSub(here, b)?.name].filter(Boolean).join(' › ') : 'All topics'

  return (
    <aside className={`bl-side${drawer ? ' is-open' : ''}`}>
      <button type="button" className="bl-drawer" onClick={() => setDrawer((d) => !d)} aria-expanded={drawer}>
        <span className="mono muted">Learning tree</span>
        <span className="bl-drawer-where">{where}</span>
        <span aria-hidden="true" className={`tcaret${drawer ? ' down' : ''}`}></span>
      </button>

      <div className="bl-tree-wrap">
        <label className="bl-search">
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="7" cy="7" r="5" /><path d="m11 11 3.5 3.5" /></svg>
          <input
            type="search"
            placeholder="Search topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <ul className="tree" role="tree">
          <li role="treeitem" aria-expanded="true">
            <a href="#/blog" className={`node node-root${!a ? ' sel' : ''}`}>
              <span className="tcaret down" aria-hidden="true"></span>
              <span className="node-name">All topics</span>
              <span className="node-count mono">{all.done}/{all.total}</span>
            </a>

            <ul role="group">
              {view.map(({ t, subs }) => {
                const tOpen = !!q || open.has(t.slug)
                const tc = countFor(t)
                return (
                  <li key={t.slug} role="treeitem" aria-expanded={tOpen}>
                    <div className={`node${a === t.slug && !b ? ' sel' : ''}${tc.done ? '' : ' dim'}`}>
                      <button type="button" className="node-toggle" onClick={() => toggle(t.slug)}
                        aria-label={`${tOpen ? 'Collapse' : 'Expand'} ${t.name}`}>
                        <span className={`tcaret${tOpen ? ' down' : ''}`}></span>
                      </button>
                      <a href={topicUrl(t)} className="node-link" onClick={() => !tOpen && toggle(t.slug)}>
                        <span className="node-name">{t.name}</span>
                        <span className="node-count mono">{tc.done}/{tc.total}</span>
                      </a>
                    </div>

                    {tOpen && (
                      <ul role="group">
                        {subs.map(({ s, items }) => {
                          const key = `${t.slug}/${s.slug}`
                          const sOpen = !!q || open.has(key)
                          const sc = countFor(t, [s])
                          return (
                            <li key={s.slug} role="treeitem" aria-expanded={sOpen}>
                              <div className={`node${a === t.slug && b === s.slug && !c ? ' sel' : ''}${sc.done ? '' : ' dim'}`}>
                                <button type="button" className="node-toggle" onClick={() => toggle(key)}
                                  aria-label={`${sOpen ? 'Collapse' : 'Expand'} ${s.name}`}>
                                  <span className={`tcaret${sOpen ? ' down' : ''}`}></span>
                                </button>
                                <a href={subUrl(t, s)} className="node-link" onClick={() => !sOpen && toggle(key)}>
                                  <span className="node-name">{s.name}</span>
                                  <span className="node-count mono">{sc.done}/{sc.total}</span>
                                </a>
                              </div>

                              {sOpen && (
                                <ul role="group">
                                  {items.map((i) => (
                                    <li key={i.slug} role="treeitem">
                                      <a
                                        href={itemUrl(t, s, i)}
                                        className={`node leaf leaf-${i.status}${a === t.slug && b === s.slug && c === i.slug ? ' sel' : ''}`}
                                      >
                                        <StatusIcon status={i.status} />
                                        <span className="node-name">{i.title}</span>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
              {view.length === 0 && <li className="muted tree-empty">No match for “{query}”.</li>}
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  )
}

/* ---------- pages (right) ---------- */

function Overview() {
  useTitle(null)
  const latest = [...posts].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 5)
  return (
    <div className="pane">
      <header className="pane-head">
        <span className="eyebrow">Blog</span>
        <h1 className="pane-h1">Learning out loud</h1>
        <p className="muted pane-lead">
          Notes from refreshing the fundamentals, with interactive visuals you can step through. Pick a topic
          in the tree to see what I've learned and what's next.
        </p>
      </header>

      <h2 className="pane-h2">By topic</h2>
      <ul className="rows">
        {topics.map((t) => (
          <li key={t.slug}>
            <a href={topicUrl(t)} className="row">
              <span className="row-name">{t.name}</span>
              <PostCount n={countFor(t).done} />
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>

      {latest.length > 0 && (
        <>
          <h2 className="pane-h2">Latest articles</h2>
          <ul className="rows">
            {latest.map((p) => {
              const t = findTopic(p.topic)
              const s = findSub(t, p.subtopic)
              return (
                <li key={postUrl(p)}>
                  <a href={postUrl(p)} className="row row-item">
                    <StatusIcon status="published" />
                    <span className="row-name">
                      {p.title}
                      <span className="mono muted row-sub">{t?.name} › {s?.name} · {formatDate(p.date)}</span>
                    </span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

function TopicPage({ topic }) {
  useTitle(topic.name)
  return (
    <div className="pane">
      <Crumbs items={[['Blog', '#/blog'], [topic.name]]} />
      <header className="pane-head">
        <span className="eyebrow">Topic</span>
        <h1 className="pane-h1">{topic.name}</h1>
        <p className="muted pane-lead">{topic.blurb}</p>
      </header>
      <ul className="rows">
        {topic.subtopics.map((s) => (
          <li key={s.slug}>
            <a href={subUrl(topic, s)} className="row">
              <span className="row-name">
                {s.name}
                <span className="muted row-sub">{s.blurb}</span>
              </span>
              <PostCount n={countFor(topic, [s]).done} />
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SubtopicPage({ topic, sub }) {
  useTitle(`${sub.name} · ${topic.name}`)
  const items = itemsOf(topic, sub)
  return (
    <div className="pane">
      <Crumbs items={[['Blog', '#/blog'], [topic.name, topicUrl(topic)], [sub.name]]} />
      <header className="pane-head">
        <span className="eyebrow">{topic.name}</span>
        <h1 className="pane-h1">{sub.name}</h1>
        <p className="muted pane-lead">{sub.blurb}</p>
      </header>
      <ol className="rows">
        {items.map((i) => (
          <li key={i.slug}>
            <a href={itemUrl(topic, sub, i)} className={`row row-item${i.status === 'published' ? '' : ' row-dim'}`}>
              <StatusIcon status={i.status} />
              <span className="row-name">
                {i.title}
                {i.post && <span className="mono muted row-sub">{formatDate(i.post.date)} · {i.post.readTime}</span>}
              </span>
              <Pill status={i.status} />
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}

function PlannedPage({ topic, sub, item }) {
  useTitle(item.title)
  const items = itemsOf(topic, sub)
  const at = items.findIndex((i) => i.slug === item.slug)
  return (
    <div className="pane">
      <Crumbs items={[['Blog', '#/blog'], [topic.name, topicUrl(topic)], [sub.name, subUrl(topic, sub)]]} />
      <header className="pane-head">
        <span className="eyebrow">{topic.name} · {sub.name}</span>
        <h1 className="pane-h1">{item.title}</h1>
        <div><Pill status={item.status} /></div>
      </header>
      <div className="planned-card">
        <p>
          {item.status === 'in-progress'
            ? "I'm learning this right now. The article and its visualization will appear here when it's ready."
            : "This one is on my list. The article and its visualization will appear here once I've learned it."}
        </p>
        <p className="mono muted">Step {at + 1} of {items.length} in {sub.name}</p>
      </div>
      <a href={subUrl(topic, sub)} className="btn">← All of {sub.name}</a>
    </div>
  )
}

function PostPage({ post, topic, sub }) {
  const { Body } = post
  useTitle(post.title)
  const series = itemsOf(topic, sub)
  const at = series.findIndex((i) => i.post === post)
  const prev = series[at - 1]
  const next = series[at + 1]
  return (
    <article className="pane post">
      <Crumbs items={[['Blog', '#/blog'], [topic.name, topicUrl(topic)], [sub.name, subUrl(topic, sub)]]} />
      <header className="post-head">
        <span className="eyebrow">{topic.name} · {sub.name}</span>
        <h1>{post.title}</h1>
        <p className="mono muted">
          {[formatDate(post.date), ...(post.tags || []), post.readTime].join(' · ')}
        </p>
      </header>
      <div className="post-body">
        <Body />
      </div>
      <footer className="post-foot">
        <div className="post-pager">
          {prev ? (
            <a href={itemUrl(topic, sub, prev)} className="pager-link">
              <span className="mono muted">← Previous</span>
              <span>{prev.title}</span>
            </a>
          ) : <span />}
          {next ? (
            <a href={itemUrl(topic, sub, next)} className={`pager-link pager-next${next.post ? '' : ' pager-soon'}`}>
              <span className="mono muted">{next.post ? 'Next →' : 'Coming next →'}</span>
              <span>{next.title}</span>
            </a>
          ) : <span />}
        </div>
      </footer>
    </article>
  )
}

function NotFound({ back = '#/blog', label = 'Back to the blog' }) {
  useTitle('Not found')
  return (
    <div className="pane">
      <p className="muted">That page doesn't exist yet.</p>
      <a href={back} className="text-link">{label} →</a>
    </div>
  )
}

// Old links like #/blog/quick-find still work: send them to the new address.
function Redirect({ to }) {
  useEffect(() => { window.location.replace(to) }, [to])
  return null
}

function Page({ path }) {
  const [a, b, c] = path
  if (!a) return <Overview />

  const topic = findTopic(a)
  if (!topic) {
    const old = posts.find((p) => p.slug === a)
    return old ? <Redirect to={postUrl(old)} /> : <NotFound />
  }
  if (!b) return <TopicPage topic={topic} />

  const sub = findSub(topic, b)
  if (!sub) return <NotFound back={topicUrl(topic)} label={`Back to ${topic.name}`} />
  if (!c) return <SubtopicPage topic={topic} sub={sub} />

  const item = itemsOf(topic, sub).find((i) => i.slug === c)
  if (!item) return <NotFound back={subUrl(topic, sub)} label={`Back to ${sub.name}`} />
  return item.post
    ? <PostPage post={item.post} topic={topic} sub={sub} />
    : <PlannedPage topic={topic} sub={sub} item={item} />
}

export default function Blog({ path = [] }) {
  return (
    <div className="bl">
      <Tree path={path} />
      <div className="bl-main">
        <Page path={path} />
      </div>
    </div>
  )
}
