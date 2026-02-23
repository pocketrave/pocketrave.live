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

export type ProjectBlurbLink = { text: string; href: string };

export type Project = {
  id: string;
  title: string;
  blurb: string;
  /** In-text links: replaces occurrences of `text` in blurb with a link to `href` */
  blurbLinks?: ProjectBlurbLink[];
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
      'Shaped the festival\'s electronic music vision from concept to execution—budgeting, curation, and full production of the Geodome\'s scenic construction and content design. ' +
      'Curated the line-up of DJs, musicians, multidisciplinary artists, and game designers; directed an immersive VR space and the real-life stage design. ' +
      'In 2024, launched a dedicated Letucień scene at the Warsaw fest and a VR experience where visitors explored the festival space in-headset and experienced live artists and DJ performances streamed inside the virtual environment. ' +
      'Oversaw every layer of the electronic scene: from the initial concept and spatial design to the implementation of scenic constructions, the engineering of the Geodome, and the production of all visual and sonic content. ' +
      'The VR space became a parallel dimension of the festival—a place where audiences could navigate the grounds in real time and tune into live streams of performances, blurring the line between physical presence and virtual participation.',
    years: [2021, 2022, 2023, 2024, 2025, 2026],
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
    blurbLinks: [
      { text: 'immersive VR space', href: 'https://www.spatial.io/s/Letucien-66912f47f89197d7d595bfbd' },
      { text: 'the festival\'s', href: 'https://ltcn.pl' },
    ],
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
    blurbLinks: [
      { text: 'Electronic Live Sessions', href: 'https://www.instagram.com/electronic.live.sessions' },
    ],
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


