import { useEffect, useState } from 'react'
import { profile } from './data.js'

// Visitor counter powered by GoatCounter (free, no cookies).
// Set profile.goatcounter in data.js to your GoatCounter code to turn it on.
// It stays hidden until there is a real number to show.
export default function VisitCounter() {
  const code = profile.goatcounter
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!code) return
    // 1. Record this visit (skipped on localhost by GoatCounter itself).
    if (!document.querySelector('script[data-goatcounter]')) {
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://gc.zgo.at/count.js'
      s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
      document.body.appendChild(s)
    }
    // 2. Read the site total to display.
    fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.count && setCount(d.count))
      .catch(() => {})
  }, [code])

  if (!count) return null
  return (
    <span className="visits">
      <span className="visits-dot" aria-hidden="true"></span>
      <span className="mono">{count}</span> visits so far
    </span>
  )
}
