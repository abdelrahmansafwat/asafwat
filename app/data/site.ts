export const profile = {
  name: 'Abdelrahman "Abdo" Safwat',
  role: 'Full Stack Developer',
  level: '5+',
  home: { name: 'Asyut, Egypt', timeZone: 'Africa/Cairo', lat: 27.18, lng: 31.18 },
  avatar: '/mii.webp',
  cvHref: '/cv.pdf',
  linkedin: 'https://www.linkedin.com/in/abdelrahman-safwat/',
  github: { username: 'abdelrahmansafwat', since: '2023-01-01' },
}

export const intro =
  `Hi! I'm Abdo, a full stack developer from ${profile.home.name}. For 5+ years I've been building web apps with Vue, React, NestJS and TypeScript. Have a look around, and feel free to write me a letter!`

export const likes = 'Video games (especially JRPGs), anime, the MCU, languages and cultures, travel'

export const languages = 'Arabic (native), English (C1), German (A2, learning)'

export const inventory = [
  {
    group: 'Frontend',
    items: ['Vue', 'React', 'TypeScript', 'Redux', 'Tailwind CSS', 'FormKit', 'Material UI'],
  },
  {
    group: 'Backend',
    items: ['NestJS', 'Node.js', 'Express', 'Prisma', 'MySQL', 'MongoDB', 'Go', 'Python', 'Socket.io'],
  },
  {
    group: 'Tools',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Playwright', 'GCP', 'Azure', 'Claude Code', 'GitHub Copilot'],
  },
]

export const achievements = [
  { title: 'Class change', detail: 'Joined a Vue and NestJS team from a React and Node background and was shipping in their stack within two weeks.' },
  { title: 'Carry', detail: 'Handled about 40% of the web tickets in a recent production release.' },
  { title: 'Solo party', detail: 'Was the only point of contact for several freelance clients at once, from scoping to delivery.' },
  { title: 'Mentor', detail: 'Taught programming to hundreds of students over two years, as a university teaching assistant and instructor.' },
  { title: 'Thousand club', detail: '1,000+ GitHub contributions in both 2024 and 2025.' },
]

export const experience = [
  {
    role: 'Full Stack Developer',
    company: 'Jimber',
    period: 'Nov 2023 to present',
    points: [
      'Multi-tenant SaaS security platform.',
      'Backend in NestJS, Prisma and MySQL. Frontend in Vue, TypeScript and Tailwind.',
      'Playwright end-to-end tests, Docker and GitHub Actions.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Digital Roots GTC',
    period: 'May 2021 to Oct 2023',
    points: [
      'Client web applications end to end at an agency, from the React frontend to the Node backend.',
      'Deployed and maintained the apps on GCP and Azure.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: 'Apr 2020 to May 2021',
    points: ['Web applications for clients in React, Node and Python, from scoping through to delivery.'],
  },
  {
    role: 'Teaching Assistant and Programming Instructor',
    company: 'EELU',
    period: 'Feb 2020 to Jul 2022',
    points: [
      'Ran CS lab sessions, graded assignments and mentored students at the Egyptian E-Learning University.',
      "Taught programming courses at the university's Continuing Learning Center.",
    ],
  },
]

export const now = [
  { label: 'Learning', value: 'Kotlin' },
  { label: 'Building', value: 'asafwat.dev' },
  { label: 'Playing', value: 'Trails in the Sky 2nd Chapter' },
  { label: 'Watching', value: 'The Falcon and the Winter Soldier' },
]

export const games: { name: string; note?: string }[] = [
  { name: 'Persona', note: 'Persona 5 Royal is the GOAT, my favorite game of all time.' },
  { name: 'Pokémon', note: "Pokémon FireRed was my first real video game. It's what got me so into gaming, and that led me to a career in tech." },
  { name: 'The Legend of Zelda' },
  { name: 'Super Smash Bros.' },
  { name: 'Animal Crossing' },
  { name: 'Mega Man Battle Network' },
  { name: 'Mega Man Star Force' },
  { name: 'Kingdom Hearts' },
  { name: 'Final Fantasy', note: "Samurai main in FFXIV. I'm Reddu Beta on Phoenix, so add me if you're there!" },
  { name: 'Story of Seasons' },
  { name: 'Fire Emblem' },
  { name: 'Octopath Traveler' },
  { name: 'Trails' },
  { name: 'Digimon' },
  { name: 'Ace Attorney', note: 'OBJECTION!!!' },
  { name: 'Professor Layton', note: 'A true gentleman leaves no puzzle unsolved.' },
  { name: 'Xenoblade Chronicles' },
  { name: 'Yu-Gi-Oh!', note: 'I main a HERO deck.' },
]
