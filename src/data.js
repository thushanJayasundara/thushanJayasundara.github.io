// All site content lives here. Edit this file to update the portfolio —
// no need to touch the components.

export const profile = {
  name: 'Thushan Jayasundara',
  role: 'Senior Software Engineer',
  focus: 'Java · Spring Boot · Event-driven microservices',
  location: 'Finland',
  summary:
    'I build and modernise backend systems that real businesses run on — a core banking platform with 14.5M users, an airline booking platform built on IATA NDC, and learning services at Pearson. 6+ years with Java and Spring Boot, from domain design to keeping things stable in production.',
  about: [
    'I own microservices end to end: shaping service boundaries with Domain-Driven Design, building them with Java 17+ and Spring Boot, wiring them together with Kafka, and running them on AWS with Docker and Kubernetes.',
    'I care about clean code, observability and secure defaults, and I enjoy mentoring junior engineers through code reviews. My goal is to become a software architect, with red-team security as my second track. I am also finishing a Master of Engineering at Metropolia UAS in Helsinki.',
  ],
  contact: {
    email: 'thushanjayasundara96@gmail.com',
    phone: '+358 45 845 9677',
    linkedin: 'https://www.linkedin.com/in/thushan-jayasundara/',
    github: 'https://github.com/thushanJayasundara',
    medium: 'https://medium.com/@thushanjayasundara96',
    // To update the CV, replace public/Thushan_Jayasundara_CV.pdf (keep the same file name).
    cv: 'Thushan_Jayasundara_CV.pdf',
  },
}

const M = 'https://medium.com/@thushanjayasundara96/'
export const articles = [
  { title: 'A Real Incident at Wolt in Helsinki: How Distributed Systems Behave Under Stress', date: 'Apr 2026', topic: 'Distributed systems', text: 'A real outage I saw as a Wolt rider, and what it shows about systems that degrade instead of failing outright.', url: M + 'a-real-incident-wolt-in-helsinki-when-systems-degrade-not-fail-3d01eab2b81f' },
  { title: 'Most Simple Guide to Mapping JPA Relationships', date: 'Dec 2025', topic: 'Architecture · JPA', text: 'JPA relationship mapping explained from a software architecture point of view.', url: M + 'most-simple-guide-to-mapping-jpa-relationships-6fd57fdeb2f6' },
  { title: 'Big O Notation Explained', date: 'Oct 2024', topic: 'Algorithms', text: 'Why Java developers should care about algorithm efficiency, and how to measure it.', url: M + 'big-o-notation-explained-boost-your-algorithms-efficiency-e6cabb08fcff' },
  { title: 'Volatile, Non-Volatile and Transient Variables in Java', date: 'Oct 2024', topic: 'Concurrency', text: 'How these modifiers affect multi-threading and memory.', url: M + 'understanding-volatile-non-volatile-and-transient-variables-in-java-eddc62235dbf' },
  { title: 'Exploring the World of JVMs: GraalVM, OpenJ9, Zulu and Beyond', date: 'Sep 2024', topic: 'JVM', text: 'A tour of JVM implementations and when each one makes sense.', url: M + 'exploring-the-world-of-jvms-graalvm-openj9-zulu-and-beyond-2036d9214ae5' },
  { title: 'Mastering Java Optional', date: 'Sep 2024', topic: 'Java', text: 'Using Optional to handle missing values and avoid NullPointerException.', url: M + 'mastering-java-optional-say-goodbye-to-nullpointerexception-db758032d953' },
  { title: 'The Evolution of Java: Key Changes from Java 8 to Java 21', date: 'Sep 2024', topic: 'Java', text: 'The biggest language and platform changes across Java versions 8 to 21.', url: M + 'the-evolution-of-java-key-changes-from-java-8-to-java-21-13a7e12c5501' },
]

// Career goals. Written as direction, not as current titles.
export const direction = [
  {
    goal: 'Software Architect',
    lead: 'My main goal. I already make many architecture calls day to day, and I want to own them across whole systems.',
    now: [
      'Designing service boundaries with Domain-Driven Design',
      'Hexagonal architecture and clean module structure',
      'Event-driven design with Kafka',
      'Data access and JPA performance',
      'Writing about Java and architecture on Medium',
      'Mentoring engineers and reviewing code',
    ],
    next: [
      'System design for large, high-traffic platforms',
      'Cloud architecture on AWS and Kubernetes',
      'Leading architecture decisions across teams',
    ],
    learningFrom: [
      { name: 'Vlad Mihalcea', note: 'Java persistence & Hibernate performance', url: 'https://www.linkedin.com/in/vladmihalcea/' },
      { name: 'Eugen Paraschiv', note: 'Spring & Java, founder of Baeldung', url: 'https://www.linkedin.com/in/eugenparaschiv/' },
    ],
  },
  {
    goal: 'Offensive Security',
    lead: 'Securing services with OAuth2, SSO and Snyk got me curious about how systems get broken. I have trained in ethical hacking with Kali Linux.',
    nowLabel: 'Trained in',
    now: [
      'Recon and information gathering',
      'Network attacks: ARP spoofing, MITM, DNS spoofing',
      'Web apps: SQL injection, XSS, LFI',
      'Exploitation with Metasploit',
    ],
    next: [
      'Advanced ethical hacking course',
      'Red-team labs and a certification',
    ],
    tools: ['Kali Linux', 'Metasploit', 'Aircrack-ng', 'Maltego'],
  },
]

// Long-term community goal, shown as a slim row under the two career tracks.
export const communityGoal = {
  goal: 'Java Champion',
  text: 'A long-term goal: giving back to the Java community until peers see me as one of its voices. I am starting by writing about Java on Medium, and plan to add talks, meetups in Helsinki and open-source work.',
  steps: ['Writing on Medium', 'Talks and meetups', 'Open-source contributions'],
}

export const stats = [
  { value: '6+', label: 'years in backend engineering' },
  { value: '25+', label: 'microservices worked across' },
  { value: '14.5M', label: 'users on the banking platform I supported' },
  { value: '3', label: 'domains: banking, airline retail, education' },
]

export const skills = [
  { group: 'Languages & frameworks', items: ['Java 11 / 17 / 21', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'Spring Data JPA', 'Spring WebFlux'] },
  { group: 'Architecture', items: ['Microservices', 'Domain-Driven Design', 'Hexagonal Architecture', 'SOLID', '12-Factor'] },
  { group: 'Messaging & cache', items: ['Apache Kafka', 'RabbitMQ', 'Redis', 'Ehcache'] },
  { group: 'Databases', items: ['MySQL / Aurora', 'DB2', 'Oracle', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'Cassandra', 'Hibernate / JPA'] },
  { group: 'Cloud & DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins', 'IBM WebSphere'] },
  { group: 'Security', items: ['OAuth2', 'Single Sign-On', 'Keycloak', 'Snyk'] },
  { group: 'Testing & monitoring', items: ['JUnit', 'Mockito', 'Integration testing', 'ELK Stack', 'Grafana', 'Prometheus', 'CloudWatch'] },
  { group: 'APIs', items: ['REST', 'GraphQL', 'SOAP / XML', 'OpenAPI / Swagger', 'Feign Client'] },
  { group: 'AI-assisted development', items: ['GitHub Copilot', 'Claude', 'AI pair programming', 'Code review & refactoring with AI', 'Prompt writing'] },
]

// Dates follow the employers' reference letters.
export const experience = [
  {
    company: 'Pearson Lanka',
    via: 'via Businessfocus 360',
    title: 'Senior Software Engineer',
    period: 'Apr 2024 – Mar 2025',
    place: 'Colombo, Sri Lanka',
    domain: 'Education',
    points: [
      'Upgraded 9+ Java microservices from Spring Boot 2.x to 3.x.',
      'Led an Amazon Aurora MySQL upgrade across 15+ services with zero downtime.',
      'Upgraded event schemas and SDKs to improve event-driven communication across 10+ microservices.',
      'Cut security risks by about 80% through Snyk vulnerability scanning and fixes.',
      'Ran services on AWS with Docker and Kubernetes; built GitHub Actions CI/CD pipelines; monitored production with CloudWatch.',
      'Designed REST APIs with the React/Angular teams and mentored junior engineers through code reviews.',
    ],
  },
  {
    company: 'Air-Retailer Technology LLC',
    title: 'Software Engineer',
    period: 'Aug 2022 – Mar 2024',
    place: 'Dubai, UAE',
    domain: 'Airline retail',
    points: [
      'Built an event-driven logging pipeline with Spring WebFlux and Kafka that streams to AWS S3 asynchronously, improving response efficiency by 40%.',
      'Integrated IATA NDC 18.1 airline standards through Amadeus connectors; reworked shared modules with Feign Client, cutting duplicated code by 60%.',
      'Designed service boundaries with DDD for a high-concurrency booking platform integrated with Singapore Airlines.',
      'Replaced hand-written audit fields with Spring Data Auditing across 25+ microservices, reducing API response time.',
      'Improved observability with the ELK stack and APM tools, shortening incident resolution.',
    ],
  },
  {
    company: "People's Bank",
    via: 'via JIT Resourcing · Silverlake Digital Economy',
    title: 'Software Engineer',
    period: 'Nov 2021 – Jul 2022',
    place: 'Colombo, Sri Lanka',
    domain: 'Banking',
    points: [
      'Resolved 20+ critical production defects on a core digital banking platform serving 14.5M users.',
      'Made Jasper reporting 40% faster by tuning its database queries.',
      'Improved inter-service reliability with Kafka and RabbitMQ messaging.',
      'Shipped production fixes across distributed banking modules on IBM WebSphere, DB2 and RHEL, working closely with QA and DevOps.',
    ],
  },
  {
    company: 'Techlead International',
    title: 'Associate Software Engineer',
    period: 'Jan 2020 – Nov 2021',
    place: 'Colombo, Sri Lanka',
    domain: 'Products & outsourcing',
    points: [
      'Backend developer on Java and Spring Boot microservices for a marketplace, a lending module, a chat app and a restaurant ordering system.',
      'Implemented OAuth2 and Single Sign-On across 8+ microservices.',
      'Integrated Firebase push notifications and mentored intern engineers.',
    ],
  },
  {
    company: 'OpenArc Systems Management',
    title: 'Trainee Software Developer',
    period: 'May 2019 – Jan 2020',
    place: 'Colombo, Sri Lanka',
    domain: 'Banking & finance',
    points: [
      'Worked on SkyBank, a banking and finance product, starting as an intern.',
      'Built APIs and Oracle database triggers that improved third-party system communication by 30%.',
    ],
  },
]

export const projects = [
  {
    name: 'Live Response',
    org: 'Pearson',
    period: '2024 – 2025',
    kind: 'Education',
    text: 'Classroom response system where teachers pose questions and students answer from their own phones or laptops, with analytics showing where the class is struggling.',
    tags: ['Spring Boot 3', 'AWS', 'Kubernetes', 'Aurora MySQL'],
  },
  {
    name: 'AirRetailer',
    org: 'Air-Retailer Technology',
    period: '2022 – 2024',
    kind: 'Airline retail',
    text: 'IATA NDC-based corporate booking and expense platform for travel management companies and corporates, with global airline inventory through Amadeus.',
    tags: ['Java', 'Spring WebFlux', 'Kafka', 'NDC 18.1', 'Hibernate'],
  },
  {
    name: 'Omni-channel Digital Banking',
    org: "People's Bank",
    period: '2021 – 2022',
    kind: 'Banking',
    text: "Digital banking platform for Sri Lanka's second-largest commercial bank, built by Silverlake Digital Economy (Malaysia), serving over 14 million customers.",
    tags: ['Java', 'Spring', 'DB2', 'WebSphere', 'RabbitMQ', 'Jasper'],
  },
  {
    name: 'Lankawe',
    org: 'Techlead International',
    period: '2020 – 2021',
    kind: 'E-commerce',
    text: 'Online marketplace for Sri Lankans to buy and sell anything. I worked on the backend microservices and search.',
    tags: ['Spring Boot', 'Microservices', 'Redis', 'MySQL', 'Elasticsearch'],
  },
  {
    name: 'LOLC Lending Module',
    org: 'Techlead International',
    period: '2020 – 2021',
    kind: 'Finance',
    text: 'Lending module of the integrated banking system at LOLC Finance, handling lending services and business logic. Outsourced project.',
    tags: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'],
  },
  {
    name: 'PcTalk',
    org: 'Techlead International',
    period: '2020 – 2021',
    kind: 'Messaging',
    text: 'Messaging app for text, photos, video, documents, location and voice calls.',
    tags: ['Java', 'Spring Boot', 'Firebase', 'OAuth2'],
  },
  {
    name: 'KOT',
    org: 'Techlead International',
    period: '2020 – 2021',
    kind: 'Restaurant',
    text: 'Kitchen Order Ticket system for restaurant ordering platforms: each order instantly creates a ticket in the kitchen.',
    tags: ['Java', 'Spring Boot', 'REST'],
  },
  {
    name: 'SkyBank',
    org: 'OpenArc',
    period: '2019 – 2020',
    kind: 'Banking',
    text: 'Integrated software suite for finance companies and merchant banks: leasing, loans, savings, fixed deposits, treasury bills and general ledger.',
    tags: ['Java', 'Struts', 'Hibernate', 'Oracle', 'SOAP'],
  },
  {
    name: 'Attendance & Leave System',
    org: 'Lead Lanka International (part-time)',
    period: '2018 – 2019',
    kind: 'ERP',
    text: 'Led development of a microservices-based attendance and leave balancing system, improving scalability with Spring Boot and Redis.',
    tags: ['Spring Boot', 'Microservices', 'Redis', 'MySQL', 'Docker'],
  },
]

const LL = 'https://www.linkedin.com/learning/certificates/'
export const certificates = [
  { name: 'EclipseStore (Advanced)', issuer: 'JAVAPRO', date: 'Sep 2025', note: 'Building fast in-memory database apps and microservices' },
  { name: 'Spring Framework in Depth', issuer: 'LinkedIn Learning', date: 'Jul 2025', url: LL + '24b8f7a11597909cc923f9c8b26660c9f9a21c47eacd0f7c34109abc36194704/' },
  { name: 'React Essential Training', issuer: 'LinkedIn Learning', date: 'Jul 2025', url: LL + '4ac14d3bc5621fca8ad772c7747e7c85adf07f95d398f93426e96458779106c7/' },
  { name: 'EclipseStore (Fundamentals)', issuer: 'JAVAPRO', date: 'Jul 2025', note: 'In-memory data storage for Java' },
  { name: 'Learning Spring 6 with Spring Boot 3', issuer: 'LinkedIn Learning', date: 'Dec 2024', url: LL + 'e416478069f340aafc0f0fb413fc8443378dd840bf78967bf37c6ce0ac055090/' },
  { name: 'Java Threads', issuer: 'LinkedIn Learning', date: 'Dec 2024', url: LL + '6e0324d81f3cdc705a35e48bd80ddb7e54235df4f77b5c2e3b11fb45541360e6/' },
  { name: 'AWS Certified Cloud Practitioner (CLF-C02) prep course', issuer: 'LinkedIn Learning', date: 'Nov 2024', url: LL + '2174fde5a61bd56f9895af4293f3c07e59029d81f956064888801b9c0b0d8bc9/' },
]

export const education = [
  { school: 'Metropolia University of Applied Sciences', degree: 'Master of Engineering, Information Technology', period: '2025 – 2026', place: 'Helsinki, Finland' },
  { school: 'University of Gloucestershire', degree: 'B.Sc. Computing, Second Class Honours (1st Division)', period: '2021 – 2022', place: 'Colombo, Sri Lanka' },
  { school: 'IDM Colombo Campus', degree: 'OTHM UK Diploma in Information Technology', period: '2021 – 2023', place: 'Colombo, Sri Lanka' },
  { school: 'Sri Lanka Institute of Advanced Technological Education', degree: 'Higher National Diploma in Information Technology', period: '2017 – 2019', place: 'Gampaha, Sri Lanka' },
  { school: 'City and Guilds of London Institute', degree: 'Diploma in Engineering, Electrical & Electronic Technology', period: '2014 – 2015', place: 'Gampaha, Sri Lanka' },
]
