import Link from 'next/link';

export default function LiveActsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-16 py-16">
        <div className="max-w-4xl space-y-12 font-orbitron">
          <h1 className="text-5xl font-bold mb-8" style={{ fontVariationSettings: '"wght" 700' }}>
            Live Acts
          </h1>
          
          <section className="space-y-6">
            <div className="w-full">
              <iframe
                width="100%"
                height="120"
                scrolling="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1968161763&color=%23848c84&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                className="border-0"
              />
            </div>
            
            <div className="space-y-4" style={{ fontVariationSettings: '"wght" 400' }}>
              <p className="text-lg leading-relaxed">
                Pocket Rave often blurs the line between composition and improvisation, sculpting raw, textured sounds into a rich sonic scape. He guides his listeners on a rave journey through experimental and emotive electro, hypnotic techno, breakbeat, and trance tunes.
              </p>
              
              <Link
                href="https://drive.google.com/file/d/1mCW3g_Wy1UM2k4I1GTXpWE7b_8Y3_CtK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                style={{ fontVariationSettings: '"wght" 400' }}
              >
                Technical Rider (PDF)
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

