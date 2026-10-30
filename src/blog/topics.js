// Blog structure: topic → subtopic → articles.
//
// Articles live in posts.jsx and point back here with { topic, subtopic }.
// `roadmap` (optional) lists lessons still to write; they show in the tree
// with a grey dot. status: 'in-progress' | 'planned'.
//
// To add a topic, copy this shape:
//   {
//     slug: 'java', name: 'Java', short: 'JAVA',
//     blurb: 'One line about the topic.',
//     subtopics: [
//       { slug: 'concurrency', name: 'Concurrency', blurb: 'One line.',
//         roadmap: [{ title: 'Virtual threads', status: 'planned' }] },
//     ],
//   },

export const topics = [
  {
    slug: 'algorithms',
    name: 'Algorithms',
    short: 'ALGO',
    blurb: 'Classic algorithms, stepped through line by line with interactive visuals.',
    subtopics: [
      {
        slug: 'union-find',
        name: 'Union-Find',
        blurb: 'Dynamic connectivity: are these two things connected?',
      },
    ],
  },
]
