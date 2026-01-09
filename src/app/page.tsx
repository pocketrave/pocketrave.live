import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';
import TypewriterSegments from '@/components/TypewriterSegments';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)] overflow-y-auto text-gray-300 relative">
      <BackgroundVideo />

      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative z-20 py-8 md:py-0">
        <div className="max-w-7xl mx-auto px-4 md:px-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 font-orbitron">
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                <TypewriterSegments
                  typingMs={14}
                  segments={[
                    {
                      type: 'text',
                      text: 'Pocket Rave is a Krakow-based electronic producer who creates music using solely hardware synths, sequencers, and samplers.',
                    },
                  ]}
                />
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                <TypewriterSegments
                  startDelayMs={250}
                  typingMs={10}
                  segments={[
                    {
                      type: 'text',
                      text: 'Over the last years, he has performed in Krakow at Prozak 2.0, Sekta Selekta, Swieta Krowa, Pacura Studios, Busz; in Warsaw at Scena Chmielna; and at big festivals— ',
                    },
                    {
                      type: 'link',
                      href: 'https://belarusout.site/',
                      text: 'Belarus Outside Soundsystem',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: ', ' },
                    {
                      type: 'link',
                      href: 'https://www.instagram.com/varushniak',
                      text: 'Varushniak',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: ', ' },
                    {
                      type: 'link',
                      href: 'https://www.instagram.com/vvvatra',
                      text: 'AUKA',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: ', and ' },
                    {
                      type: 'link',
                      href: 'https://www.ltcn.pl',
                      text: 'Letucień',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: '.' },
                  ]}
                />
              </p>
              <p className="text-lg leading-relaxed" style={{ fontVariationSettings: '"wght" 400' }}>
                <TypewriterSegments
                  startDelayMs={450}
                  typingMs={10}
                  segments={[
                    { type: 'text', text: 'You can also spot him speaking on a ' },
                    {
                      type: 'link',
                      href: 'https://radioplato.by/shows/editorial-podcast/',
                      text: 'Radio Plato editorial',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: ', a ' },
                    {
                      type: 'link',
                      href: 'https://www.youtube.com/@streamartstudio',
                      text: 'UkrainaTV',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: ' live, and ' },
                    {
                      type: 'link',
                      href: 'https://www.instagram.com/duszno_podcast',
                      text: 'Duszno podcast',
                      className: 'hover:text-red-600 underline',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    { type: 'text', text: '.' },
                  ]}
                />
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
