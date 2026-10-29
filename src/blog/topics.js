// Blog structure: topic → subtopic → articles.
//
// Articles live in posts.jsx and point back here with { topic, subtopic }.
// `roadmap` is what's coming next in a subtopic, so the blog doubles as a
// study tracker. status: 'in-progress' | 'planned'.
// When you publish one, delete it from the roadmap and add the post.

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
        roadmap: [
          { title: 'Quick-union: turning teams into trees', status: 'planned' },
          { title: 'Weighted quick-union', status: 'planned' },
          { title: 'Path compression', status: 'planned' },
        ],
      },
      {
        slug: 'sorting',
        name: 'Sorting',
        blurb: 'Putting things in order, from simple to fast.',
        roadmap: [
          { title: 'Selection sort', status: 'planned' },
          { title: 'Insertion sort', status: 'planned' },
          { title: 'Merge sort', status: 'planned' },
          { title: 'Quicksort', status: 'planned' },
        ],
      },
      {
        slug: 'searching',
        name: 'Searching',
        blurb: 'Finding things quickly in sorted and unsorted data.',
        roadmap: [{ title: 'Binary search', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'data-structures',
    name: 'Data Structures',
    short: 'DS',
    blurb: 'How data is stored, and why the choice changes everything.',
    subtopics: [
      {
        slug: 'linear',
        name: 'Stacks, Queues & Lists',
        blurb: 'The basic building blocks.',
        roadmap: [
          { title: 'Stack with a linked list vs an array', status: 'planned' },
          { title: 'Queue and resizing arrays', status: 'planned' },
        ],
      },
      {
        slug: 'trees',
        name: 'Trees',
        blurb: 'Binary search trees, balanced trees and heaps.',
        roadmap: [
          { title: 'Binary search tree', status: 'planned' },
          { title: 'Binary heap and priority queue', status: 'planned' },
        ],
      },
      {
        slug: 'hashing',
        name: 'Hash Tables',
        blurb: 'Constant-time lookups and what makes them work.',
        roadmap: [{ title: 'Separate chaining vs linear probing', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'java',
    name: 'Java',
    short: 'JAVA',
    blurb: 'Modern Java, the JVM and writing code that holds up in production.',
    subtopics: [
      {
        slug: 'core',
        name: 'Core Java',
        blurb: 'Collections, streams, records and the newer language features.',
        roadmap: [{ title: 'Streams under the hood', status: 'planned' }],
      },
      {
        slug: 'concurrency',
        name: 'Concurrency',
        blurb: 'Threads, executors, virtual threads and the memory model.',
        roadmap: [{ title: 'Virtual threads vs platform threads', status: 'planned' }],
      },
      {
        slug: 'jvm',
        name: 'JVM & Memory',
        blurb: 'Heap, stack, garbage collection.',
        roadmap: [{ title: 'Where your objects live: heap vs stack', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'spring-boot',
    name: 'Spring Boot',
    short: 'SPRING',
    blurb: 'Building and securing backend services with Spring.',
    subtopics: [
      {
        slug: 'rest',
        name: 'REST APIs',
        blurb: 'Controllers, validation, error handling.',
        roadmap: [{ title: 'Request lifecycle in Spring MVC', status: 'planned' }],
      },
      {
        slug: 'security',
        name: 'Spring Security',
        blurb: 'OAuth2, JWT and Keycloak.',
        roadmap: [{ title: 'The security filter chain, visualized', status: 'planned' }],
      },
      {
        slug: 'data',
        name: 'Data & JPA',
        blurb: 'Repositories, transactions and the N+1 problem.',
        roadmap: [{ title: 'Transactions and propagation', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'networking',
    name: 'Networking',
    short: 'NET',
    blurb: 'How data actually moves: OSI layers, IP, TCP and DNS.',
    subtopics: [
      {
        slug: 'ip-addressing',
        name: 'IP Address Fundamentals',
        blurb: 'Where IP sits in the OSI model, address classes, CIDR and subnetting.',
        roadmap: [
          { title: 'OSI model: where IP lives (Layer 3)', status: 'in-progress' },
          { title: 'IP address categories: public, private, special', status: 'planned' },
          { title: 'Classful vs classless (CIDR)', status: 'planned' },
          { title: 'Subnetting concepts', status: 'planned' },
          { title: 'Subnetting calculations, step by step', status: 'planned' },
        ],
      },
      {
        slug: 'transport',
        name: 'TCP & UDP',
        blurb: 'Handshakes, reliability and ports.',
        roadmap: [{ title: 'The TCP three-way handshake', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'cyber-security',
    name: 'Cyber Security',
    short: 'SEC',
    blurb: 'Web security basics and how real attacks work.',
    subtopics: [
      {
        slug: 'web-security',
        name: 'Web Security',
        blurb: 'The OWASP Top 10, explained with examples.',
        roadmap: [
          { title: 'SQL injection', status: 'planned' },
          { title: 'XSS and CSRF', status: 'planned' },
        ],
      },
      {
        slug: 'auth',
        name: 'Authentication',
        blurb: 'Sessions, tokens, OAuth2 and OpenID Connect.',
        roadmap: [{ title: 'OAuth2 authorization code flow', status: 'planned' }],
      },
    ],
  },
  {
    slug: 'docker',
    name: 'Docker',
    short: 'DOCKER',
    blurb: 'Containers from the ground up.',
    subtopics: [
      {
        slug: 'basics',
        name: 'Images & Containers',
        blurb: 'Layers, Dockerfiles and what a container really is.',
        roadmap: [{ title: 'Image layers, visualized', status: 'planned' }],
      },
      {
        slug: 'compose',
        name: 'Docker Compose',
        blurb: 'Running multi-service apps locally.',
        roadmap: [{ title: 'Spring Boot + Postgres + Kafka with Compose', status: 'planned' }],
      },
    ],
  },
]
