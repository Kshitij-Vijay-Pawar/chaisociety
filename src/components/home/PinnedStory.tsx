'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const scenes = [
  {
    label: 'Chapter 01 — The Brew',
    title: 'Chai',
    accent: 'Warm',
    description:
      'Brewed slow over a low flame, our chai is four generations of spice and milk. A cup that asks for nothing but your attention.',
    image: 'https://images.pexels.com/photos/20270270/pexels-photo-20270270.jpeg?auto=compress&cs=tinysrgb&h=1500&w=1000',
    alt: 'Masala chai in clay cups with ginger and cardamom',
    bg: 'bg-forest-900',
    fg: 'text-cream-light',
  },
  {
    label: 'Chapter 02 — The Awakening',
    title: 'Matcha & Coffee',
    accent: 'Fresh',
    description:
      'Stone-ground Uji matcha and single-origin pour overs. Two rituals, one counter — the bright green and the deep brown.',
    image: 'https://images.pexels.com/photos/8004562/pexels-photo-8004562.jpeg?auto=compress&cs=tinysrgb&h=1500&w=1000',
    alt: 'Iced matcha latte with ice cubes',
    bg: 'bg-cream-warm',
    fg: 'text-forest-900',
  },
  {
    label: 'Chapter 03 — The Table',
    title: 'Food & Snacks',
    accent: 'Shared',
    description:
      'Bun maska, grilled panini, masala maggi and a chaat platter for the whole table. The food is the reason people stay.',
    image: 'https://images.pexels.com/photos/13250821/pexels-photo-13250821.jpeg?auto=compress&cs=tinysrgb&h=1500&w=1000',
    alt: 'A drink with a sandwich and fries on a cozy table',
    bg: 'bg-chai-DEFAULT',
    fg: 'text-cream-light',
  },
];

export default function PinnedStory() {
  const root = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 1024px)').matches;
      if (reduced || isMobile || !pin.current) return;

      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>('[data-scene]');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: `+=${panels.length * 90}%`,
            pin: pin.current,
            scrub: 1,
          },
        });

        panels.forEach((panel, i) => {
          if (i === 0) return;
          const img = panel.querySelector('[data-scene-img]');
          const txt = panel.querySelector('[data-scene-text]');
          const prev = panels[i - 1];
          const prevImg = prev.querySelector('[data-scene-img]');
          const prevTxt = prev.querySelector('[data-scene-text]');

          tl.to([prevImg, prevTxt], { opacity: 0, y: -40, duration: 0.5 }, i - 1)
            .set(panel, { zIndex: i + 1 }, i - 1 + 0.01)
            .fromTo(
              img,
              { opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' },
              { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.7 },
              i - 1 + 0.25,
            )
            .fromTo(
              txt,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.6 },
              i - 1 + 0.35,
            );
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-forest-900">
      <div ref={pin} className="relative h-[100svh] w-full overflow-hidden">
        {scenes.map((s, i) => (
          <div
            key={s.title}
            data-scene
            className={`absolute inset-0 ${s.bg} ${s.fg}`}
            style={{ zIndex: i === 0 ? 1 : 0 }}
          >
            {/* Background image */}
            <div
              data-scene-img
              className="absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                clipPath: i === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
              }}
            >
              <img
                src={s.image}
                alt={s.alt}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/40 to-transparent" />
              <div className="absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />
            </div>

            {/* Text */}
            <div
              data-scene-text
              className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 lg:px-10"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-chai-DEFAULT" />
                  <span className="eyebrow opacity-80">{s.label}</span>
                </div>
                <p className="mt-6 text-[0.7rem] uppercase tracking-widest-2 opacity-70">{s.accent}</p>
                <h2 className="mt-2 font-display text-[16vw] font-light leading-[0.88] tracking-tighter sm:text-[10vw] lg:text-[8vw]">
                  {s.title}
                </h2>
                <p className="mt-8 max-w-md text-base leading-relaxed opacity-85 lg:text-lg">
                  {s.description}
                </p>
              </div>
            </div>

            {/* progress dots */}
            <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-2 lg:flex">
              {scenes.map((_, d) => (
                <span
                  key={d}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    d === i ? 'w-8 bg-chai-DEFAULT' : 'bg-current opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile natural scroll version */}
      <div className="lg:hidden">
        {scenes.map((s) => (
          <div key={s.title} className={`relative ${s.bg} ${s.fg} px-6 py-24`}>
            <div className="relative aspect-[4/5] overflow-hidden mb-8">
              <img src={s.image} alt={s.alt} className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-chai-DEFAULT" />
              <span className="eyebrow opacity-80">{s.label}</span>
            </div>
            <h2 className="mt-4 font-display text-6xl font-light leading-[0.9]">{s.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed opacity-85">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
