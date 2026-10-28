import { useEffect, useMemo, useRef, useState } from 'react'

// Step-by-step simulation of QuickFindUF, run from main().
// Every step is precomputed into a list, so Back / Next / the slider
// are just moving an index through that list.

const N = 6
const TEAM_COLORS = ['#7F77DD', '#1D9E75', '#D85A30', '#D4537E', '#378ADD', '#BA7517']

const CODE = [
  'public class QuickFindUF {',
  '    private int[] id;',
  '',
  '    public QuickFindUF(int N) {',
  '        id = new int[N];',
  '        for (int i = 0; i < N; i++)',
  '            id[i] = i;',
  '    }',
  '',
  '    public boolean connected(int p, int q) {',
  '        return id[p] == id[q];',
  '    }',
  '',
  '    public void union(int p, int q) {',
  '        int pid = id[p];',
  '        int qid = id[q];',
  '        for (int i = 0; i < id.length; i++)',
  '            if (id[i] == pid)',
  '                id[i] = qid;',
  '    }',
  '',
  '    public static void main(String[] args) {',
  '        QuickFindUF uf = new QuickFindUF(6);',
  '        uf.union(0, 1);',
  '        uf.union(2, 3);',
  '        System.out.println(uf.connected(0, 3));',
  '        uf.union(1, 3);',
  '        System.out.println(uf.connected(0, 3));',
  '    }',
  '}',
]

// Tiny Java highlighter: keywords, types, numbers.
const KW = /^(public|private|class|static|void|int|boolean|new|for|if|return)$/
const TYPE = /^(QuickFindUF|String|System)$/
function highlight(line) {
  return line.split(/(\b\w+\b)/).map((part, i) => {
    if (KW.test(part)) return <span key={i} className="tok-kw">{part}</span>
    if (TYPE.test(part)) return <span key={i} className="tok-type">{part}</span>
    if (/^\d+$/.test(part)) return <span key={i} className="tok-str">{part}</span>
    return part
  })
}

function buildSteps() {
  const steps = []
  let id = null
  let set = []
  const out = []
  const push = (s) => steps.push({ ...s, id: id ? [...id] : null, set: [...set], out: [...out] })
  const yes = (b) => <b className={b ? 'qf-yes' : 'qf-no'}>{String(b)}</b>

  push({ line: 21, stack: ['main'], msg: <>The JVM starts the program at <code>main</code>.</> })
  push({ line: 22, stack: ['main'], msg: <>Create a <code>QuickFindUF</code> with 6 objects. This calls the constructor.</> })

  const cs = ['main', 'QuickFindUF(6)']
  push({ line: 3, caller: 22, stack: cs, vars: { N }, msg: <>Jump into the constructor with <code>N = 6</code>.</> })
  id = Array(N).fill(0)
  set = Array(N).fill(false)
  push({ line: 4, caller: 22, stack: cs, vars: { N }, msg: <>Create the array. Java fills a new <code>int[]</code> with zeros.</> })
  for (let i = 0; i < N; i++) {
    push({ line: 5, caller: 22, stack: cs, vars: { N, i }, mark: [i], msg: <>i = {i}. Is {i} &lt; {N}? Yes, keep looping.</> })
    id[i] = i
    set[i] = true
    push({ line: 6, caller: 22, stack: cs, vars: { N, i }, mark: [i], msg: <>id[{i}] = {i}. Object {i} is its own team.</> })
  }
  push({ line: 7, caller: 22, stack: cs, vars: { N, i: N }, msg: <>Constructor done. Every object is alone. Back to <code>main</code>.</> })

  const ufVars = { uf: 'QuickFindUF@6' }
  const calls = [['u', 0, 1, 23], ['u', 2, 3, 24], ['c', 0, 3, 25], ['u', 1, 3, 26], ['c', 0, 3, 27]]
  for (const [type, p, q, ml] of calls) {
    if (type === 'u') {
      push({ line: ml, stack: ['main'], vars: ufVars, msg: <><code>main</code> calls <code>uf.union({p}, {q})</code>.</> })
      const st = ['main', `union(${p}, ${q})`]
      const v = { p, q }
      push({ line: 13, caller: ml, stack: st, vars: { ...v }, mark: [p, q], msg: <>Jump into <code>union({p}, {q})</code>. <code>main</code> waits on the yellow line.</> })
      v.pid = id[p]
      push({ line: 14, caller: ml, stack: st, vars: { ...v }, mark: [p], msg: <>pid = id[{p}] = {v.pid}. This is the team we will rename.</> })
      v.qid = id[q]
      push({ line: 15, caller: ml, stack: st, vars: { ...v }, mark: [q], msg: <>qid = id[{q}] = {v.qid}. This is the new team name.</> })
      for (let i = 0; i < N; i++) {
        v.i = i
        push({ line: 16, caller: ml, stack: st, vars: { ...v }, mark: [i], msg: <>i = {i}. Is {i} &lt; {N}? Yes, keep looping.</> })
        const hit = id[i] === v.pid
        push({ line: 17, caller: ml, stack: st, vars: { ...v }, mark: [i], msg: <>Is id[{i}] ({id[i]}) == pid ({v.pid})? {yes(hit)}{hit ? '' : ', so skip.'}</> })
        if (hit) {
          id[i] = v.qid
          push({ line: 18, caller: ml, stack: st, vars: { ...v }, mark: [i], msg: <>id[{i}] = {v.qid}. Object {i} joins team {v.qid}.</> })
        }
      }
      v.i = N
      push({ line: 16, caller: ml, stack: st, vars: { ...v }, msg: <>i = {N}. Is {N} &lt; {N}? No, the loop ends.</> })
      push({ line: 19, caller: ml, stack: st, vars: { ...v }, mark: [p, q], msg: <><code>union</code> is done. It checked all {N} objects, which is the slow part.</> })
      push({ line: ml, stack: ['main'], vars: ufVars, mark: [p, q], msg: <>Back in <code>main</code>. {p} and {q} are now connected.</> })
    } else {
      push({ line: ml, stack: ['main'], vars: ufVars, msg: <><code>main</code> calls <code>uf.connected({p}, {q})</code> and will print the result.</> })
      const st = ['main', 'println(…)', `connected(${p}, ${q})`]
      const r = id[p] === id[q]
      push({ line: 9, caller: ml, stack: st, vars: { p, q }, mark: [p, q], msg: <>Jump into <code>connected({p}, {q})</code>.</> })
      push({ line: 10, caller: ml, stack: st, vars: { p, q }, mark: [p, q], msg: <>id[{p}] ({id[p]}) == id[{q}] ({id[q]})? Returns {yes(r)}. Only 2 reads, which is why it is fast.</> })
      out.push(String(r))
      push({ line: ml, stack: ['main'], vars: ufVars, msg: <>Back in <code>main</code>. <code>println</code> prints <b>{String(r)}</b>.</> })
    }
  }
  push({ line: 28, stack: ['main'], vars: ufVars, msg: <>End of <code>main</code>. The program is finished.</> })
  return steps
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function QuickFindVisualizer() {
  const steps = useMemo(buildSteps, [])
  const [at, setAt] = useState(0)
  const [playing, setPlaying] = useState(false)
  const codeRef = useRef(null)
  const s = steps[at]
  const last = steps.length - 1
  const mark = s.mark || []

  useEffect(() => {
    if (!playing) return
    if (at >= last) { setPlaying(false); return }
    const t = setTimeout(() => setAt((a) => Math.min(a + 1, last)), prefersReducedMotion() ? 1400 : 850)
    return () => clearTimeout(t)
  }, [playing, at, last])

  // Keep the running line visible when the code box scrolls (small screens).
  useEffect(() => {
    const box = codeRef.current
    const el = box?.querySelector('.qf-ln.on')
    if (!box || !el || box.scrollHeight <= box.clientHeight) return
    const top = el.offsetTop - box.offsetTop
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 40) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }, [at])

  const go = (n) => { setPlaying(false); setAt(Math.max(0, Math.min(last, n))) }

  return (
    <div className="qf" aria-label="Quick-find step-by-step simulation">
      <div className="qf-stage">
        <div className="qf-row">
          {s.id ? s.id.map((v, i) => (
            <div key={i} className={`qf-obj${mark.includes(i) ? ' on' : ''}`}>
              <div className="qf-dot" style={{ background: s.set[i] ? TEAM_COLORS[v] : 'var(--line)' }}>{i}</div>
              <span className="mono">id[{i}]=<b>{v}</b></span>
            </div>
          )) : <p className="qf-empty mono">No array yet. id is null.</p>}
        </div>
        <p className="qf-arr mono">
          int[] id = {s.id ? <>{'{ '}{s.id.map((v, i) => (
            <span key={i}>{i > 0 && ', '}{mark.includes(i) ? <b>{v}</b> : v}</span>
          ))}{' }'}</> : 'null'}
        </p>
        <p className="qf-msg" aria-live="polite">{s.msg}</p>

        <div className="qf-controls">
          <button type="button" className="btn" onClick={() => go(at - 1)} disabled={at === 0}>← Back</button>
          <button type="button" className="btn primary" onClick={() => go(at + 1)} disabled={at === last}>Next line →</button>
          <button type="button" className="btn" onClick={() => (at === last ? (setAt(0), setPlaying(true)) : setPlaying((p) => !p))}>
            {playing ? 'Pause' : 'Auto play'}
          </button>
          <button type="button" className="btn" onClick={() => go(0)}>Start over</button>
        </div>
        <label className="qf-progress">
          <span className="mono muted">Step {at + 1} / {steps.length}</span>
          <input type="range" min="0" max={last} step="1" value={at} onChange={(e) => go(Number(e.target.value))} aria-label="Jump to step" />
        </label>
      </div>

      <div className="qf-panels">
        <div>
          <h4>Call stack</h4>
          <ol className="qf-box mono">
            {[...s.stack].reverse().map((f, i) => <li key={f} className={i === 0 ? 'top' : ''}>{f}</li>)}
          </ol>
        </div>
        <div>
          <h4>Variables</h4>
          <dl className="qf-box mono">
            {s.vars ? Object.entries(s.vars).map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            )) : <span className="muted">none</span>}
          </dl>
        </div>
        <div>
          <h4>Console</h4>
          <div className="qf-box mono">
            {s.out.length ? s.out.map((o, i) => <div key={i}>&gt; {o}</div>) : <span className="muted">nothing yet</span>}
          </div>
        </div>
      </div>

      <div className="qf-code-wrap">
        <div className="code-bar">
          <span className="code-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span className="code-file">QuickFindUF.java</span>
        </div>
        <pre className="qf-code" ref={codeRef}>
          {CODE.map((l, i) => (
            <div key={i} className={`qf-ln${i === s.line ? ' on' : ''}${i === s.caller ? ' call' : ''}`}>
              <span className="qf-num" aria-hidden="true">{i + 1}</span>{highlight(l) || ' '}
            </div>
          ))}
        </pre>
        <p className="qf-legend">
          <span><i className="on" /> running now</span>
          <span><i className="call" /> waiting for a method to return</span>
        </p>
      </div>
    </div>
  )
}
