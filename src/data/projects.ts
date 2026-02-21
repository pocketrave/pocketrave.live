export type ProjectMedium =
  | 'music'
  | 'live-visuals'
  | 'live-coding'
  | 'festival'
  | 'club'
  | 'engineering'
  | 'education'
  | 'installation'
  | 'exhibition'
  | 'vr'
  | 'community';

export type ProjectRole =
  | 'artist'
  | 'producer'
  | 'performer'
  | 'vj'
  | 'creative-coder'
  | 'organizer'
  | 'co-organizer'
  | 'founder'
  | 'engineer'
  | 'volunteer'
  | 'educator'
  | 'coordinator'
  | 'composer'
  | 'programmer'
  | 'gardener';

export type ProjectContext =
  | 'festival'
  | 'club'
  | 'gallery'
  | 'workshop'
  | 'community'
  | 'online'
  | 'studio'
  | 'home';

export type ProjectMediaItem =
  | { kind: 'video'; src: string; title?: string }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'soundcloud'; src: string; title?: string }
  | { kind: 'iframe'; src: string; title?: string; height?: number }
  | { kind: 'link'; href: string; label: string };

export type Project = {
  id: string;
  title: string;
  blurb: string;
  years: number[]; // used as chips (e.g. [2022, 2023, 2024])
  location?: string;
  medium: ProjectMedium[];
  role: ProjectRole[];
  context: ProjectContext[];
  tags: string[]; // extra tags (tools, themes, etc.)
  color: string; // hex color used for mixing / highlighting
  media?: ProjectMediaItem[];
  /** Image filenames in /img/projects/{id}/ folder (e.g. ['1.jpg', '2.jpg']) */
  images?: string[];
};

// NOTE: This is a starter dataset. We’ll expand as you share more projects.
export const projects: Project[] = [
  {
    id: 'ltcn-art-picnic',
    title: 'Art picnic LTCŃ',
    blurb:
      'Conceptualized, budgeted, and curated the electronic music scene of the festival: invited DJs, musicians, multidisciplinary artists, and game designers to join the line-up, directed an artistic VR space, and decorated the real-life stage.',
    years: [2021, 2022, 2023, 2024, 2025],
    location: 'Kraków',
    medium: ['festival', 'music', 'installation', 'exhibition', 'vr'],
    role: ['co-organizer', 'artist', 'performer', 'coordinator'],
    context: ['festival', 'online'],
    tags: [
      'live act',
      'art installation',
      'organization',
      'VR space',
      'coordination',
      'construction',
      'geodome',
      'engineering',
      'budgeting',
    ],
    color: '#ff2bd6',
    media: [],
    images: ['2.jpg'],
  },
  {
    id: 'electronic-live-sessions',
    title: 'Electronic Live Sessions',
    blurb:
      'Started up Series of techno events, Electronic Live Sessions in Krakow. Now shapes the project and consistently selects Poland-based live performers and electronic artists from Belarus, Poland, and Ukraine to play together, network, exchange experiences, and popularize live electronic music.',
    years: [2023, 2024, 2025],
    location: 'Kraków',
    medium: ['club', 'music', 'community'],
    role: ['co-organizer', 'artist', 'performer', 'coordinator'],
    context: ['club', 'community'],
    tags: ['live act', 'organization', 'hardware electronic artists', 'live techno acts'],
    color: '#00e5ff',
    media: [],
    images: ['els.jpg', 'DSCF5766.JPG'],
  },
  {
    id: 'pocket-visuals',
    title: 'Pocket Visuals VJ installations',
    blurb:
      'Creates dynamic generative visuals via Python programming. Performs across Poland, using portable video synthesizer.',
    years: [2023, 2024, 2025],
    location: 'Kraków, Warsaw',
    medium: ['live-visuals', 'live-coding', 'music'],
    role: ['artist', 'performer', 'programmer', 'vj'],
    context: ['club', 'festival'],
    tags: ['VJ', 'visual programming', 'python', 'pygame', 'eyesy'],
    color: '#7c3aed',
    media: [],
    images: ['eyesy-1.mp4', 'eyesy-2.mp4'],
  },
  {
    id: 'dzichkamusic',
    title: 'dzichkamusic installation',
    blurb:
      'Dzichkamusic is a collective intuitive musical improvisation on fruits. The set usually represents an installation on a table. As the main theme plays, the participants add their own melody by touching the fruits, plants, and bowls of water connected to a MIDI module.',
    years: [2018, 2019, 2021, 2022, 2023, 2024],
    location: 'Minsk, Kraków, Warsaw',
    medium: ['festival', 'music', 'installation', 'engineering'],
    role: ['artist', 'composer', 'performer', 'programmer', 'gardener'],
    context: ['festival'],
    tags: ['musical improvisations', 'sound design', 'interactive installation', 'playtronica'],
    color: '#ff6a00',
    media: [],
    images: ['IMG_7664.JPG', 'IMG_7666.JPG', 'photo_2025-01-10_13-03-21.jpg'],
  },
  {
    id: 'live-electronic-jams',
    title: 'Live Electronic Jams',
    blurb: "That's the collective musical improvisations",
    years: [2021, 2022, 2023, 2024, 2025],
    location: 'Kraków',
    medium: ['club', 'music', 'community'],
    role: ['coordinator', 'organizer', 'performer'],
    context: ['club', 'home'],
    tags: ['electronic musical improvisations', 'sound design', 'jam sessions', 'curation'],
    color: '#00ff85',
    media: [],
    images: ['chmielna-2.jpg'],
  },
];


