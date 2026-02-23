
export default function LiveActsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-16 md:py-16">
        <div className="max-w-4xl space-y-6 md:space-y-12 font-orbitron">
          <h1 className="text-5xl font-bold mb-4 md:mb-8" style={{ fontVariationSettings: '"wght" 700' }}>
            Live Acts
          </h1>
          
          <section className="space-y-4 md:space-y-6">
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <p className="text-lg leading-relaxed">
                Pocket Rave often blurs the line between composition and improvisation, sculpting raw, textured sounds into a rich sonic scape. He guides his listeners on a rave journey through experimental and emotive electro, hypnotic techno, breakbeat, and trance tunes.
              </p>              
            </div>
            <div>
              <iframe width="100%" height="200" scrolling="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2191024215&color=%23171c18&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"></iframe>
              
            </div>
            <div className="w-full overflow-hidden" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
              <iframe
                title="SoundCloud player"
                width="100%"
                height="120"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2151592191&color=%23ff2600&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                className="border-0"
              />
            </div>
            <div className="w-full overflow-hidden" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
              <iframe
                title="SoundCloud player - Electronic Live Sessions, Sekta Selekta 22-10-2024"
                width="100%"
                height="120"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1968161763&color=%23ff2600&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                className="border-0"
              />
            </div>
            
          </section>
        </div>
      </div>
    </div>
  );
}

