import Image from 'next/image';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)] overflow-y-auto text-gray-300 relative">
      <BackgroundVideo />

      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative z-20 py-8 md:py-0">
        <div className="max-w-7xl mx-auto px-4 md:px-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 font-orbitron">
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                Pocket Rave is a Krakow-based electronic producer who creates music using solely hardware synths, sequencers, and samplers.
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                Over the last years, he has performed in Krakow at Prozak 2.0, Sekta Selekta, Swieta Krowa, Pacura Studios, Busz; in Warsaw at Scena Chmielna; and at big festivals—{' '}
                <Link href="https://belarusout.site/" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Belarus Outside Soundsystem
                </Link>
                , {' '}
                <Link href="https://www.instagram.com/varushniak" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Varushniak
                </Link>
                , {' '}
                <Link href="https://www.instagram.com/vvvatra" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  AUKA
                </Link>
                , and {' '}
                <Link href="https://www.ltcn.pl" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Letucień
                </Link>
                .
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                You can also spot him speaking on a {' '}
                <Link href="https://radioplato.by/shows/editorial-podcast/" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Radio Plato editorial
                </Link>
                , a {' '}
                <Link href="https://www.youtube.com/@streamartstudio" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  UkrainaTV
                </Link>
                {' '} live, and {' '}
                <Link href="https://www.instagram.com/duszno_podcast" className=" hover:text-red-600 underline" target="_blank" rel="noopener noreferrer">
                  Duszno podcast
                </Link>
                .
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-8 font-orbitron pt-4">
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
                  <Link 
                    href="mailto:pocketrave@proton.me" 
                    className="text-lg hover:text-red-600 transition-colors"
                    style={{ fontVariationSettings: '"wght" 400' }}
                  >
                    pocketrave@proton.me
                  </Link>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
