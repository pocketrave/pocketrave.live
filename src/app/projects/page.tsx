import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-16 py-16">
        <div className="max-w-4xl space-y-12 font-orbitron">
          <h1 className="text-5xl font-bold mb-8" style={{ fontVariationSettings: '"wght" 700' }}>
            Projects
          </h1>
          
          <section className="space-y-6">
            <h2 className="text-3xl font-bold" style={{ fontVariationSettings: '"wght" 700' }}>
              Art picnic Letucień
            </h2>
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <div className="text-sm space-y-1">
                <p>Kraków</p>
                <p>Co-organizer</p>
                <p>2022-Present time</p>
              </div>
              <p className="text-lg leading-relaxed">
                Conceptualized, budgeted, and curated the electronic music scene of the festival: invited DJs, musicians, multidisciplinary artists, and game designers to join the line-up, directed an artistic VR space, and decorated the real-life stage. He also provided technical coordination and ran logistics, coordinated volunteers, and maintained the equipment at the venue.
              </p>
              <p className="text-lg leading-relaxed">
                2024—Organised a dedicated Letucień festival scene on the {' '}
                <Link href="https://www.instagram.com/varushniak/" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Varushniak
                </Link>
                {' '} fest in Warsaw
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold" style={{ fontVariationSettings: '"wght" 700' }}>
              Series of techno events Electronic Live Sessions
            </h2>
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <div className="text-sm space-y-1">
                <p>Kraków</p>
                <p>Founder</p>
                <p>2023-Present time</p>
              </div>
              <p className="text-lg leading-relaxed">
                Started up Electronic Live Sessions in Krakow. Now shapes the project and consistently selects Poland-based live performers and electronic artists from Belarus, Poland, and Ukraine to play together, network, exchange experiences, and popularize live electronic music.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-center" style={{ fontVariationSettings: '"wght" 700' }}>
              VJ installations Pocket Visuals
            </h2>
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <div className="text-sm space-y-1">
                <p>Kraków</p>
                <p>Artist</p>
                <p>2023-Present time</p>
              </div>
              <p className="text-lg leading-relaxed">
                Creates dynamic generative visuals via Python programming. Performs across Poland, using portable video synthesizer.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-right" style={{ fontVariationSettings: '"wght" 700' }}>
              dzichkamusic installation
            </h2>
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <div className="text-sm space-y-1">
                <p>Minsk, Kraków</p>
                <p>Co-founder, Artist</p>
                <p>2018-Present time</p>
              </div>
              <p className="text-lg leading-relaxed">
                Dzichkamusic is a collective intuitive musical improvisation on fruits. The set usually represents an installation on a table. As the main theme plays, the participants add their own melody by touching the fruits, plants, and bowls of water connected to a MIDI module.
              </p>
              <p className="text-lg leading-relaxed">
                The team behind the project believes that music is a universal language and there is nothing more beautiful than creating it in synergy. This way, dzichkamusic allows people who have never made music to take their first steps through a juicy improvisation. We carefully record every sound, and although the result is unpredictable, the final track always feels smooth.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

