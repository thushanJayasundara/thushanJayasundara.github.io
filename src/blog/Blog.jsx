import { useEffect } from 'react'
import { posts } from './posts.jsx'

const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

function BlogIndex() {
  return (
    <section className="section blog-index">
      <header className="section-head">
        <span className="eyebrow">Blog</span>
        <h2>Learning out loud</h2>
        <p className="blog-lead muted">
          Notes from refreshing the fundamentals: algorithms, data structures and backend patterns,
          with interactive visuals you can step through.
        </p>
      </header>
      <ul className="articles">
        {posts.map((p) => (
          <li key={p.slug}>
            <a href={`#/blog/${p.slug}`} className="article">
              <span className="mono muted">{formatDate(p.date)}</span>
              <div className="article-body">
                <span className="kind">{p.topic} · {p.readTime}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.summary}</p>
              </div>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function BlogPost({ post }) {
  const { Body } = post
  useEffect(() => {
    document.title = `${post.title} · Thushan Jayasundara`
  }, [post])
  return (
    <article className="section post">
      <a href="#/blog" className="text-link post-back">← All posts</a>
      <header className="post-head">
        <span className="eyebrow">{post.topic}</span>
        <h1>{post.title}</h1>
        <p className="mono muted">{formatDate(post.date)} · {post.readTime}</p>
      </header>
      <div className="post-body">
        <Body />
      </div>
      <footer className="post-foot">
        <a href="#/blog" className="btn">← Back to all posts</a>
      </footer>
    </article>
  )
}

export default function Blog({ slug }) {
  const post = slug && posts.find((p) => p.slug === slug)
  useEffect(() => {
    if (!post) document.title = 'Blog · Thushan Jayasundara'
  }, [post])
  if (slug && !post) {
    return (
      <section className="section">
        <p className="muted">That post doesn't exist yet.</p>
        <a href="#/blog" className="text-link">See all posts →</a>
      </section>
    )
  }
  return post ? <BlogPost post={post} /> : <BlogIndex />
}
