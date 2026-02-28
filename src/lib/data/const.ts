import { getPath } from '$utils/generators'
import type { Project } from './types'

export const name = 'Ilia Pikulev'

export const email = '=MXdz1WZ0VmchlGQn1WYpxmLj9Wb'

export const projects: Project[] = [
  {
    id: 'mega-performance',
    title: 'MEGA: Media Library Performance for 1.7 million nodes',
    year: '2026',
    // eslint-disable-next-line max-len
    description: 'Frontend specialist on the enterprise platform team at Mega (330M+ users). Improved file loading performance, achieving a 75x boost in the Web Media library, directly impacting hundreds of millions of users.',
    tags: ['JavaScript'],
    categories: ['performance', 'frontend'],
    catLabels:  ['Performance',  'Frontend'],
    links: [{ label: 'mega.io', href: 'https://mega.io' }],
    component: ['perf', 'Media Library loading', '300', '4', 's']
  },
  {
    id: 'susmeter',
    title: 'SusMeter: AI Signature Detector in Media files',
    year: '2026',
    // eslint-disable-next-line max-len
    description: 'Free tool for identifying AI-generated signatures in media files. Built as a public utility at the intersection of ML and media analysis, with a clean web interface for broad accessibility.',
    tags: ['AI/ML', 'Svelte'],
    categories: ['side-projects', 'performance'],
    catLabels:  ['Side Projects',  'Performance'],
    links: [{ label: 'susmeter.ai', href: 'https://susmeter.ai' }],
    image: 'https://susmeter.ai/logo.svg',
    video: getPath('/vid/susmeter-showcase.mp4')
  },
  {
    id: 'make-quicker',
    title: 'make-quicker: NPM library of methods to improve performance',
    year: '2025',
    description: 'My \'performance-improvements\' journey led me to creating a useful library that works faster than the conventional JS methods.',
    tags: ['JavaScript'],
    categories: ['performance', 'frontend'],
    catLabels:  ['Performance',  'Frontend'],
    links: [{ label: 'github.com/pikil/make-quicker', href: 'https://github.com/pikil/make-quicker' }],
    component: ['perf', 'My sorting comparing to the standard sort on 1m unique numbers', '170', '12', 'ms']
  },
  {
    id: 'quinque',
    title: 'Quinque: A simple game where you can challenge someone (or a computer) in a short colorful battle',
    year: '2024',
    description: 'Created a strategic and competitive game where players engage in a battle of wits on a grid.',
    tags: ['JavaScript', 'Firebase', 'WebRTC'],
    categories: ['gamedev', 'WebRTC multiplayer'],
    catLabels:  ['Gamedev',  'WebRTC multiplayer'],
    links: [{ label: 'pikil.github.io/quinque', href: 'https://pikil.github.io/quinque' }],
    image: getPath('/img/quinque-logo.png'),
    video: getPath('/vid/quinque-showcase.mp4')
  },
  {
    id: 'yada',
    title: 'Yada: Lead generator for Specialists',
    year: '2023-2025',
    // eslint-disable-next-line max-len
    description: 'SaaS web platform connecting clients with specialists. Built end-to-end as an independent project, covering product design, frontend, backend, and infrastructure.',
    tags: ['Svelte', 'Node.js', 'Firebase', 'PHP'],
    categories: ['side-projects', 'fullstack', 'seo'],
    catLabels:  ['Side Projects',  'Full stack', 'SEO'],
    links: [{ label: 'yada.co.nz', href: 'https://yada.co.nz' }],
    component: ['seo']
  },
  {
    id: 'mega-albums',
    title: 'MEGA: Albums & UI Component Framework',
    year: '2022–2023',
    // eslint-disable-next-line max-len
    description: 'Architected the Albums feature in the Mega Webclient and designed a JavaScript-based framework of reusable UI components to standardise development across the codebase.',
    tags: ['JavaScript'],
    categories: ['frontend', 'feature_delivery'],
    catLabels:  ['Frontend', 'Feature delivery'],
    links: [{ label: 'mega.io', href: 'https://mega.io' }],
    image: 'https://mega.io/wp-content/uploads/Media_Album-1.png'
  },
  {
    id: 'polyvid',
    title: 'Polyvid.io: Instant video translations (defunct)',
    year: '2021',
    // eslint-disable-next-line max-len
    description: 'Designed and built one of the first AI/ML projects in the world to translate Youtube videos into any language in an instant. The translation is synced, contains audio and text captions.',
    tags: ['Javascript', 'PHP', 'AI/ML'],
    categories: ['ai/ml', 'integrations'],
    catLabels:  ['AI/ML',  'Integrations'],
    links: [{ label: 'polyvid.io', href: 'https://polyvid.io' }],
    image: getPath('/img/polyvid-logo.png')
  },
  {
    id: 'kcs-api',
    title: 'Kitchen Cabinet and Stones: REST API Platform & Partner Integrations',
    year: '2020–2022',
    // eslint-disable-next-line max-len
    description: 'Designed and built a REST API platform connecting internal systems with Microsoft Dynamics 365, Stripe, Humm, Zip, PayPal, and custom CNC machinery interfaces.',
    tags: ['MS365', 'Vectorworks', 'CNC', 'Bash'],
    categories: ['integrations', 'performance', 'scale'],
    catLabels:  ['Integrations',  'Performance', 'Scale'],
    links: [{ label: 'kitchencabinets.co.nz', href: 'https://kitchencabinets.co.nz' }],
    image: getPath('/img/kcs-logo.png')
  },
  {
    id: 'kcs-devops',
    title: 'Kitchen Cabinets and Stones: Delivery optimiser',
    year: '2017–2020',
    // eslint-disable-next-line max-len
    description: 'Built a real-time delivery estimation mechanism to get an instant quote for any size of the pallet(s) order delivering to any place in New Zealand',
    tags: ['ThreeJS', 'Mainfreight', 'Bin Packing problem solve'],
    categories: ['threejs', 'team-lead'],
    catLabels:  ['ThreeJS',  'Team Lead'],
    links: [{ label: 'kitchencabinets.co.nz', href: 'https://kitchencabinets.co.nz' }],
    image: getPath('/img/kcs-logo.png')
  },
  {
    id: 'coloban',
    title: 'Coloban: Messenger with Task Management features',
    year: '2018-2020',
    // eslint-disable-next-line max-len
    description: 'A messenger app with integrated task-management capabilities. Built with real-time communication using WebRTC and a collaborative task layer on top of the messaging infrastructure.',
    tags: ['Vue', 'WebRTC', 'Node.js', 'PHP', 'Capacitor', 'Electron', 'MongoDB'],
    categories: ['side-projects', 'frontend', 'crossplatform'],
    catLabels:  ['Side Projects',  'Frontend', 'Cross-platform'],
    links: [{ label: 'coloban.com', href: 'https://coloban.com' }],
    image: 'https://www.coloban.com/img/banner2.png'
  },
  {
    id: 'kcs-scale',
    title: 'Kitchen Cabinets and Stones: Scale and Solutions architect',
    year: '2015–2020',
    description: 'Built a framework that allowed to scale the family business to the nation-wide kitchen retailer',
    tags: ['CI/CD', 'PHP', 'Javascript', 'Jenkins', 'Docker', 'AWS', 'Bash'],
    categories: ['devops', 'team-lead', 'scale'],
    catLabels:  ['DevOps', 'Team Lead', 'Scale'],
    links: [{ label: 'kitchencabinets.co.nz', href: 'https://kitchencabinets.co.nz' }],
    image: getPath('/img/kcs-logo.png')
  },
  {
    id: 'robots-eye',
    title: 'Robot\'s eye: A puzzle mobile game (defunct)',
    year: '2015',
    description: 'Built a a puzzle mobile game to challenge players to return the mechanical eye to the robot',
    tags: ['Stencyl'],
    categories: ['gamedev', 'crossplatform'],
    catLabels:  ['Gamedev', 'Cross-platform'],
    links: [],
    image: getPath('/img/robots-eye-logo.png'),
    video: getPath('/vid/robots-eye-showcase.mp4')
  }
]
