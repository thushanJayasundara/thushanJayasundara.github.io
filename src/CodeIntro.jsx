import { useEffect, useRef, useState } from 'react'

// "Then and now": my first Java program from 2019, rewritten as Java 25.
// Each part has a syntax class so it can be colored like an editor.
const VERSIONS = [
  {
    year: '2019',
    label: 'Java 8',
    file: 'Abc.java',
    cmd: '$ javac Abc.java && java Abc',
    output: 'Hello, World!',
    code: [
      { t: 'public class', c: 'kw' }, { t: ' ' }, { t: 'Abc', c: 'type' }, { t: ' {\n    ' },
      { t: 'public static void', c: 'kw' }, { t: ' ' }, { t: 'main', c: 'fn' }, { t: '(' },
      { t: 'String', c: 'type' }, { t: ' args[]) {\n        ' },
      { t: 'System', c: 'type' }, { t: '.out.' }, { t: 'println', c: 'fn' }, { t: '(' },
      { t: '"Hello, World!"', c: 'str' }, { t: ');\n    }\n}' },
    ],
  },
  {
    year: '2026',
    label: 'Java 25',
    file: 'Main.java',
    cmd: '$ java Main.java',
    output: "Hello, World! I'm Thushan.",
    code: [
      { t: 'void', c: 'kw' }, { t: ' ' }, { t: 'main', c: 'fn' }, { t: '() {\n    ' },
      { t: 'IO', c: 'type' }, { t: '.' }, { t: 'println', c: 'fn' }, { t: '(' },
      { t: '"Hello, World! I\'m Thushan."', c: 'str' }, { t: ');\n}' },
    ],
  },
]
const len = (v) => v.code.reduce((n, p) => n + p.t.length, 0)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Stages: type → run → (pause → erase → next version) … → done
export default function CodeIntro() {
  const still = prefersReducedMotion()
  const last = VERSIONS.length - 1
  const [v, setV] = useState(still ? last : 0)
  const [typed, setTyped] = useState(still ? len(VERSIONS[last]) : 0)
  const [stage, setStage] = useState(still ? 'done' : 'idle')
  const ref = useRef(null)
  const ver = VERSIONS[v]

  // Start only when the editor scrolls into view.
  useEffect(() => {
    if (stage !== 'idle') return
    const start = () => setStage('type')
    if (!('IntersectionObserver' in window)) { start(); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { start(); io.disconnect() }
    }, { threshold: 0.6 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [stage])

  useEffect(() => {
    let id
    if (stage === 'type') {
      if (typed < len(ver)) id = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 400 : 26)
      else id = setTimeout(() => setStage('run'), 400)
    } else if (stage === 'run') {
      id = setTimeout(() => setStage(v < last ? 'pause' : 'done'), 1400)
    } else if (stage === 'pause') {
      id = setTimeout(() => setStage('erase'), 900)
    } else if (stage === 'erase') {
      if (typed > 0) id = setTimeout(() => setTyped((n) => Math.max(0, n - 4)), 12)
      else { setV((x) => x + 1); setStage('type') }
    }
    return () => clearTimeout(id)
  }, [stage, typed, v, ver, last])

  // After the animation, the year tabs let people flip between versions.
  const show = (i) => {
    if (stage !== 'done') return
    setV(i)
    setTyped(len(VERSIONS[i]))
  }
  const ran = stage === 'run' || stage === 'pause' || stage === 'done'

  // Render only the characters typed so far, keeping each part's color.
  let left = typed
  const parts = ver.code.map((p, i) => {
    if (left <= 0) return null
    const shown = p.t.slice(0, left)
    left -= p.t.length
    return <span key={i} className={p.c ? `tok-${p.c}` : undefined}>{shown}</span>
  })

  return (
    <figure ref={ref} className="code-intro">
      <div className="code-bar">
        <span className="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="code-tabs" role="tablist" aria-label="Java version">
          {VERSIONS.map((x, i) => (
            <button
              key={x.year}
              type="button"
              role="tab"
              aria-selected={v === i}
              className={`code-tab${v === i ? ' on' : ''}`}
              disabled={stage !== 'done'}
              onClick={() => show(i)}
            >
              {x.year} <span className="code-tab-sub">{x.label}</span>
            </button>
          ))}
        </span>
        <span className="code-file" aria-hidden="true">{ver.file}</span>
      </div>
      <pre className="code-src" aria-label={`${ver.year} version in ${ver.label}`}><code>{parts}{!ran && <span className="caret" />}</code></pre>
      <div className={`code-out${ran ? ' show' : ''}`} aria-hidden={!ran}>
        <span className="prompt">{ver.cmd}</span>
        <span className="out-line">{ver.output}{ran && <span className="caret" />}</span>
      </div>
      <figcaption className="code-cap">
        2019: my first Java program. Today: same idea, much less ceremony.
      </figcaption>
    </figure>
  )
}
