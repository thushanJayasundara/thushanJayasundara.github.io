import QuickFindVisualizer from './QuickFindVisualizer.jsx'

// Blog posts. Each post is a slug, some metadata, and a Body component.
// `topic` and `subtopic` are slugs from topics.js; that decides where the
// post shows up. To add a post, add an entry here (and remove it from that
// subtopic's roadmap in topics.js).

function QuickFindPost() {
  return (
    <>
      <p>
        Union-find answers one simple question: are these two things connected? Think of friends in a
        social network, computers on a network, or pixels in an image. Quick-find is the simplest way
        to solve it, and a great place to start before moving on to faster versions.
      </p>

      <h2>The idea in one line</h2>
      <p>
        Every object gets a <strong>team number</strong>, stored in an array called <code>id</code>.
        Two objects are connected if they have the same team number. That is the whole trick.
      </p>
      <ul>
        <li><code>connected(p, q)</code> asks: are p and q on the same team? Look at two numbers. Fast.</li>
        <li><code>union(p, q)</code> says: move everyone on p's team to q's team. Check every object. Slow.</li>
      </ul>

      <h2>Watch it run</h2>
      <p>
        Below is the full Java program, including <code>main</code>. Press <em>Next line</em> to run one
        line at a time, or <em>Auto play</em> to watch it go. The circles are the objects, and their
        color is their team. The call stack, variables and console update as the code runs.
      </p>

      <QuickFindVisualizer />

      <h2>Things to notice</h2>
      <ul>
        <li>
          <strong>The constructor runs first.</strong> Java fills a new <code>int[]</code> with zeros, then
          the loop sets <code>id[i] = i</code>, so every object starts alone.
        </li>
        <li>
          <strong>Watch <code>union(1, 3)</code>.</strong> Object 0 changes team too, even though the call never
          mentions 0. The loop renames everyone who has <code>pid</code>, not just <code>p</code>.
        </li>
        <li>
          <strong>Why save <code>pid</code> first?</strong> If the loop read <code>id[p]</code> each time,
          its value would change halfway through when <code>i</code> reaches <code>p</code>, and the
          objects after it would be missed. Saving it in a local variable avoids that bug.
        </li>
        <li>
          <strong>The loop never stops early.</strong> Even if only one object changes, <code>union</code> still
          looks at all N objects.
        </li>
      </ul>

      <h2>How much does it cost?</h2>
      <div className="post-table">
        <table>
          <thead>
            <tr><th>Operation</th><th>Array accesses</th><th>Grows with N?</th></tr>
          </thead>
          <tbody>
            <tr><td><code>QuickFindUF(N)</code></td><td>N</td><td>Yes, once</td></tr>
            <tr><td><code>connected(p, q)</code></td><td>2</td><td>No</td></tr>
            <tr><td><code>union(p, q)</code></td><td>Up to 2N + 2</td><td>Yes, every call</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The problem shows up at scale. To connect N objects you need about N union calls, and each one
        scans N entries. That is about <strong>N² array accesses</strong>. With a billion objects, that is
        10<sup>18</sup> steps, which is years of computing. Quadratic algorithms do not scale.
      </p>

      <h2>What's next</h2>
      <p>
        Quick-find makes <code>connected</code> fast and <code>union</code> slow. The next version,
        quick-union, flips that trade-off by turning teams into trees. After that, weighting and path
        compression make both operations nearly constant time. I will visualize those the same way in
        upcoming posts.
      </p>
    </>
  )
}

export const posts = [
  {
    slug: 'quick-find',
    title: 'Quick-find: watching union-find run line by line',
    date: '2026-10-28',
    topic: 'algorithms',
    subtopic: 'union-find',
    tags: ['Java'],
    readTime: '5 min read',
    summary:
      'The simplest union-find algorithm, explained with an interactive simulator that runs the Java code from main, one line at a time.',
    Body: QuickFindPost,
  },
]
