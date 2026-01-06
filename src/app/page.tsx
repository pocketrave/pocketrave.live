import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-[calc(100vh-5rem)] overflow-hidden bg-neutral-950 text-white">
      <div className="h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 font-orbitron">
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                Pocket Rave is a Krakow-based electronic producer who creates music using solely hardware synths, sequencers, and samplers.
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                Over the last years, he has performed in Krakow at Prozak 2.0, Sekta Selekta, Swieta Krowa, Pacura Studios, Busz; in Warsaw at Scena Chmielna; and at big festivals—{' '}
                <Link href="https://belarusout.site/" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Belarus Outside Soundsystem
                </Link>
                , {' '}
                <Link href="https://www.instagram.com/varushniak" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Varushniak
                </Link>
                , {' '}
                <Link href="https://www.instagram.com/vvvatra" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  AUKA
                </Link>
                , and {' '}
                <Link href="https://www.ltcn.pl" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Letucień
                </Link>
                .
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                You can also spot him speaking on a {' '}
                <Link href="https://radioplato.by/shows/editorial-podcast/" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Radio Plato editorial
                </Link>
                , a {' '}
                <Link href="https://www.youtube.com/@streamartstudio" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  UkrainaTV
                </Link>
                {' '} live, and {' '}
                <Link href="https://www.instagram.com/duszno_podcast" className="text-white hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Duszno podcast
                </Link>
                .
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-orbitron pt-4">
                <div className="space-y-4">
                  <Link 
                    href="https://www.instagram.com/pocket.rave/" 
                    className="block text-lg hover:text-red-600 transition-colors"
                    style={{ fontVariationSettings: '"wght" 400' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </Link>
                  <Link 
                    href="https://soundcloud.com/pocketrave" 
                    className="block text-lg hover:text-red-600 transition-colors"
                    style={{ fontVariationSettings: '"wght" 400' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SoundCloud
                  </Link>
                  <Link 
                    href="https://ra.co/dj/pocketrave" 
                    className="block text-lg hover:text-red-600 transition-colors"
                    style={{ fontVariationSettings: '"wght" 400' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resident Advisor
                  </Link>
                </div>
                
                <div className="text-right">
                  <Link 
                    href="mailto:els.krakow@proton.me" 
                    className="text-lg hover:text-red-600 transition-colors"
                    style={{ fontVariationSettings: '"wght" 400' }}
                  >
                    els.krakow@proton.me
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 relative">
                <Image
                  src="/img/synth.gif"
                  alt="Pocket Rave"
                  fill
                  className="object-cover rounded"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
