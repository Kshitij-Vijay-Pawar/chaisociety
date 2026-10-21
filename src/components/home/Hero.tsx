'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Animation Configuration ─────────────────────────────────────────────────
// Tune these constants to adjust timing independently per element.
// All values are expressed as fractions of the pinned scroll progress (0–1).
const ANIM = {
    // Total pinned scroll distance in vh units (enough scroll distance to complete animation)
    scrollDistance: 160,
    mobileScrollDistance: 130,

    // Background & logo fade-in
    logoReveal: [0.00, 0.15] as [number, number],
    openingReveal: [0.00, 0.20] as [number, number],
} as const;

export default function Hero() {
    const rootRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const openingRef = useRef<HTMLParagraphElement>(null);
    const soonRef = useRef<HTMLDivElement>(null);
    const soonLineRef = useRef<SVGPathElement>(null);
    const cupRef = useRef<HTMLDivElement>(null);
    const shopRef = useRef<HTMLDivElement>(null);
    const supportRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.innerWidth < 768;
            const scrollDist = isMobile ? ANIM.mobileScrollDistance : ANIM.scrollDistance;

            // ── Reduced-motion fallback ────────────────────────────────────────────
            if (reduced) {
                gsap.set(
                    [bgRef.current, openingRef.current, soonRef.current,
                    cupRef.current, shopRef.current, supportRef.current],
                    { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
                );
                if (soonLineRef.current) {
                    gsap.set(soonLineRef.current, { strokeDashoffset: 0, opacity: 1 });
                }
                return;
            }

            // ── Line SVG setup (fluid full-width ribbon wave) ──────────────────────
            const linePath = soonLineRef.current;
            let lineLen = 0;
            if (linePath) {
                lineLen = linePath.getTotalLength();
                gsap.set(linePath, {
                    strokeDasharray: lineLen,
                    strokeDashoffset: lineLen,
                    opacity: 1,
                });
            }

            // ── Initial static states ──────────────────────────────────────────────
            gsap.set(bgRef.current, { opacity: 1 });
            gsap.set(shopRef.current, { opacity: 1, y: 0, scale: 1 });
            gsap.set(openingRef.current, { opacity: 0, letterSpacing: '0.55em', y: 6 });
            gsap.set(soonRef.current, { opacity: 0, y: 10 });
            gsap.set(supportRef.current, { opacity: 0, y: 12 });
            gsap.set(scrollRef.current, { opacity: 0 });

            // ── Step 1: Cup Initial (First Location) ──────────────────────────────
            // Its first location is already resting half visible behind the shop
            const firstLocationY = isMobile ? -50 : -80; // half visible peeking out behind the shop
            const scrolledY = isMobile ? -160 : -220;    // on scroll, pops up higher into full view

            gsap.set(cupRef.current, {
                y: firstLocationY,
                opacity: 1,
                rotate: 0,
                scale: 1,
            });

            // On-load reveals typography & labels smoothly
            const loadTl = gsap.timeline({ delay: 0.1 });
            loadTl
                .to([openingRef.current, soonRef.current, supportRef.current], {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: 'power2.out',
                })
                .to(scrollRef.current, {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                }, '-=0.3');

            // ── Step 2: On-Scroll Pinned Animation ─────────────────────────────────
            // Section is pinned while:
            // 1) The cup pops up higher from its half-visible first location into full hero view
            // 2) Simultaneously, the SVG line vector in SOON animates from left to right
            const pinTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: `+=${scrollDist}vh`,
                    pin: wrapRef.current,
                    pinSpacing: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                },
            });

            // Hide scroll indicator on first scroll
            pinTimeline.to(scrollRef.current, {
                opacity: 0,
                duration: 0.1,
                ease: 'power1.out',
            }, 0);

            // Cup pops up higher into view from its half-visible location
            pinTimeline.to(cupRef.current, {
                y: scrolledY,
                rotate: -3,
                scale: 1.05,
                ease: 'power1.out',
                duration: 0.85,
            }, 0);

            // SVG line vector animates from left to right simultaneously
            if (linePath && lineLen > 0) {
                pinTimeline.to(linePath, {
                    strokeDashoffset: 0,
                    ease: 'power1.inOut',
                    duration: 1,
                }, 0);
            }

            return () => {
                ScrollTrigger.getAll().forEach((t) => t.kill());
            };
        },
        { scope: rootRef },
    );

    return (
        <section
            ref={rootRef}
            aria-label="Opening soon hero"
            className="relative w-full"
            style={{ height: '100vh' }}
        >
            {/* ── Pinned inner wrapper ─────────────────────────────────────────── */}
            <div
                ref={wrapRef}
                className="relative w-full overflow-hidden"
                style={{ height: '100vh' }}
            >
                {/* ── Layer 1: Sky background ──────────────────────────────────── */}
                <div
                    ref={bgRef}
                    className="absolute inset-0"
                    style={{ opacity: 1 }}
                >
                    <Image
                        src="/assets/hero/bg.png"
                        alt="Blue sky with clouds"
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        className="object-cover object-center"
                        draggable={false}
                    />
                    {/* subtle vignette at base to ground storefront */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to bottom, transparent 50%, rgba(10,20,10,0.18) 100%)',
                        }}
                    />
                </div>

                {/* ── Layer 3: Typography & Left-to-Right SVG Line ──────────────── */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
                    style={{ zIndex: 5, paddingBottom: '8vh' }}
                >
                    <p
                        ref={openingRef}
                        className="font-sans font-medium text-forest-900 select-none uppercase tracking-[0.4em] sm:tracking-[0.55em]"
                        style={{
                            fontSize: 'clamp(0.6rem, 1.2vw, 0.85rem)',
                            marginBottom: 'clamp(8px, 1.5vw, 16px)',
                            opacity: 0,
                        }}
                    >
                        OPENING
                    </p>

                    {/* Central Hero SOON branding with animated ribbon wave */}
                    <div
                        ref={soonRef}
                        className="relative w-full flex flex-col items-center justify-center select-none"
                        style={{ opacity: 0 }}
                    >
                        {/* Fluid animated SVG wave line */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen min-w-[100vw] pointer-events-none overflow-visible">
                            <svg
                                viewBox="0 0 1920 280"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto min-h-[90px] sm:min-h-[140px] lg:min-h-[220px]"
                                preserveAspectRatio="none"
                                aria-label="Decorative fluid line"
                            >
                                <defs>
                                    <linearGradient id="heroRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#052217" stopOpacity="0.08" />
                                        <stop offset="15%" stopColor="#052217" stopOpacity="0.7" />
                                        <stop offset="50%" stopColor="#011B09" stopOpacity="0.95" />
                                        <stop offset="85%" stopColor="#052217" stopOpacity="0.7" />
                                        <stop offset="100%" stopColor="#052217" stopOpacity="0.08" />
                                    </linearGradient>
                                    <filter id="ribbonGlow" x="-10%" y="-30%" width="120%" height="160%" filterUnits="userSpaceOnUse">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Ambient guide wave */}
                                <path
                                    d="M 0 140 C 280 200, 520 70, 820 120 C 1120 170, 1420 80, 1920 145"
                                    stroke="#052217"
                                    strokeWidth="1"
                                    strokeOpacity="0.18"
                                    strokeDasharray="6 8"
                                    fill="none"
                                />

                                {/* Main animated dynamic ribbon line */}
                                <path
                                    ref={soonLineRef}
                                    d="M 0 135 C 240 70, 480 215, 780 145 C 960 102, 1140 185, 1380 120 C 1620 55, 1780 170, 1920 135"
                                    stroke="url(#heroRibbonGrad)"
                                    strokeWidth="3.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#ribbonGlow)"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* 'SOON' Original Brand Typography Path (Crisp vector title) */}
                        <div className="relative z-10 w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[660px]">
                            <svg
                                viewBox="0 0 582 185"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-auto drop-shadow-[0_2px_12px_rgba(1,27,9,0.06)]"
                                aria-label="SOON"
                            >
                                <path
                                    d="M160.137 77.0134C160.137 79.3797 159.684 81.5094 158.779 83.4024C157.925 85.2428 156.767 86.8204 155.309 88.135C153.851 89.3971 152.116 90.3436 150.104 90.9746C148.142 91.6582 146.081 92 143.918 92C140.598 92 137.556 91.3952 134.79 90.1858C132.074 88.9238 129.811 87.2411 128 85.1377L129.282 83.9545C131.193 86.1105 133.407 87.7406 135.921 88.8449C138.486 89.8966 141.126 90.4225 143.842 90.4225C145.804 90.4225 147.665 90.1332 149.425 89.5548C151.185 88.9238 152.744 88.0561 154.102 86.9519C155.46 85.795 156.516 84.4016 157.27 82.7714C158.076 81.0887 158.477 79.1693 158.477 77.0134C158.477 74.8574 158.05 73.0433 157.195 71.5709C156.34 70.0984 155.234 68.8364 153.876 67.7848C152.518 66.7331 150.958 65.8655 149.198 65.1818C147.488 64.4457 145.753 63.7883 143.993 63.2099C141.781 62.4737 139.744 61.7112 137.883 60.9225C136.072 60.0811 134.488 59.082 133.13 57.9251C131.823 56.7157 130.791 55.2959 130.037 53.6658C129.333 51.9831 128.981 49.9586 128.981 47.5922C128.981 45.2786 129.409 43.2278 130.263 41.4398C131.168 39.5994 132.375 38.0744 133.884 36.865C135.393 35.6029 137.128 34.6564 139.09 34.0254C141.102 33.3418 143.214 33 145.426 33C148.142 33 150.707 33.5521 153.121 34.6564C155.586 35.7081 157.597 37.2331 159.156 39.2313L157.874 40.4144C156.465 38.574 154.655 37.1542 152.442 36.1551C150.279 35.1034 147.916 34.5775 145.351 34.5775C143.54 34.5775 141.755 34.8404 139.995 35.3663C138.284 35.8922 136.726 36.7072 135.318 37.8115C133.909 38.8631 132.777 40.2041 131.923 41.8342C131.068 43.4644 130.64 45.3837 130.64 47.5922C130.64 49.7482 131.018 51.5887 131.772 53.1136C132.526 54.586 133.532 55.8481 134.79 56.8997C136.047 57.9514 137.455 58.819 139.014 59.5027C140.623 60.1863 142.258 60.8173 143.918 61.3957C146.181 62.1845 148.293 62.9995 150.255 63.8409C152.216 64.6297 153.926 65.6025 155.384 66.7594C156.893 67.9163 158.05 69.336 158.855 71.0187C159.709 72.6489 160.137 74.6471 160.137 77.0134ZM252.347 62.5C252.347 66.812 251.644 70.7821 250.235 74.4104C248.877 77.9861 246.967 81.0887 244.502 83.7179C242.088 86.2946 239.196 88.319 235.826 89.7914C232.456 91.2639 228.81 92 224.888 92C220.965 92 217.319 91.2639 213.949 89.7914C210.579 88.319 207.663 86.2946 205.198 83.7179C202.784 81.0887 200.873 77.9861 199.465 74.4104C198.107 70.7821 197.428 66.812 197.428 62.5C197.428 58.188 198.107 54.2442 199.465 50.6684C200.873 47.0401 202.784 43.9377 205.198 41.361C207.663 38.7318 210.554 36.681 213.873 35.2086C217.243 33.7361 220.914 33 224.888 33C228.861 33 232.507 33.7361 235.826 35.2086C239.196 36.681 242.088 38.7318 244.502 41.361C246.967 43.9377 248.877 47.0401 250.235 50.6684C251.644 54.2442 252.347 58.188 252.347 62.5ZM250.688 62.5C250.688 58.6088 250.06 54.9804 248.802 51.615C247.544 48.197 245.76 45.2259 243.446 42.7019C241.182 40.1778 238.467 38.2059 235.298 36.7861C232.13 35.3137 228.66 34.5775 224.888 34.5775C221.116 34.5775 217.645 35.3137 214.477 36.7861C211.309 38.2059 208.568 40.1778 206.254 42.7019C203.991 45.2259 202.231 48.197 200.973 51.615C199.716 54.9804 199.087 58.6088 199.087 62.5C199.087 66.3912 199.691 70.0459 200.898 73.4639C202.156 76.8294 203.915 79.7741 206.179 82.2981C208.442 84.8222 211.158 86.8204 214.326 88.2928C217.495 89.7126 221.015 90.4225 224.888 90.4225C228.76 90.4225 232.281 89.7126 235.449 88.2928C238.618 86.8204 241.333 84.8222 243.597 82.2981C245.86 79.7741 247.595 76.8294 248.802 73.4639C250.06 70.0459 250.688 66.3912 250.688 62.5ZM344.539 62.5C344.539 66.812 343.835 70.7821 342.428 74.4104C341.069 77.9861 339.158 81.0887 336.694 83.7179C334.28 86.2946 331.388 88.319 328.019 89.7914C324.649 91.2639 321.002 92 317.08 92C313.157 92 309.51 91.2639 306.142 89.7914C302.772 88.319 299.854 86.2946 297.389 83.7179C294.975 81.0887 293.065 77.9861 291.657 74.4104C290.299 70.7821 289.62 66.812 289.62 62.5C289.62 58.188 290.299 54.2442 291.657 50.6684C293.065 47.0401 294.975 43.9377 297.389 41.361C299.854 38.7318 302.747 36.681 306.066 35.2086C309.435 33.7361 313.107 33 317.08 33C321.053 33 324.698 33.7361 328.019 35.2086C331.388 36.681 334.28 38.7318 336.694 41.361C339.158 43.9377 341.069 47.0401 342.428 50.6684C343.835 54.2442 344.539 58.188 344.539 62.5ZM342.88 62.5C342.88 58.6088 342.251 54.9804 340.994 51.615C339.737 48.197 337.951 45.2259 335.637 42.7019C333.374 40.1778 330.658 38.2059 327.491 36.7861C324.322 35.3137 320.852 34.5775 317.08 34.5775C313.307 34.5775 309.837 35.3137 306.67 36.7861C303.501 38.2059 300.759 40.1778 298.446 42.7019C296.182 45.2259 294.423 48.197 293.166 51.615C291.908 54.9804 291.28 58.6088 291.28 62.5C291.28 66.3912 291.884 70.0459 293.091 73.4639C294.347 76.8294 296.108 79.7741 298.371 82.2981C300.633 84.8222 303.349 86.8204 306.519 88.2928C309.687 89.7126 313.207 90.4225 317.08 90.4225C320.952 90.4225 324.472 89.7126 327.642 88.2928C330.81 86.8204 333.526 84.8222 335.789 82.2981C338.052 79.7741 339.787 76.8294 340.994 73.4639C342.251 70.0459 342.88 66.3912 342.88 62.5ZM424.586 90.4225L386.263 36.7861H386.036V90.4225H384.377V34.5775H386.715L425.114 88.135H425.34V34.5775H427V90.4225H424.586Z"
                                    fill="#011B09"
                                />
                            </svg>
                        </div>

                        {/* Title descriptive copy */}
                        <p
                            className="mt-3 max-w-[280px] xs:max-w-sm sm:max-w-md text-center font-sans text-[0.62rem] sm:text-xs tracking-wider text-forest-800/80 uppercase font-medium"
                        >
                            A new era of slow-brewed culture & hospitality
                        </p>
                    </div>
                </div>

                {/* ── Layer 4: Cup (moves on scroll with custom scrub/speed) ───── */}
                <div
                    ref={cupRef}
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 6,
                        bottom: 'clamp(120px, 22vh, 260px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'clamp(130px, 17vw, 270px)',
                    }}
                >
                    <Image
                        src="/assets/hero/cup.png"
                        alt="Chai Society takeaway cup"
                        width={330}
                        height={354}
                        quality={90}
                        className="w-full h-auto object-contain"
                        draggable={false}
                    />
                </div>

                {/* ── Layer 5: Storefront ───────────────────────────────────────── */}
                <div
                    ref={shopRef}
                    className="absolute left-0 right-0 bottom-0 pointer-events-none -mb-15"
                    style={{
                        zIndex: 7,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <Image
                        src="/assets/hero/shop.png"
                        alt="Chai Society cafe storefront"
                        width={784}
                        height={392}
                        quality={90}
                        sizes="(max-width: 768px) 55vw, 50vw"
                        className="w-full h-auto object-contain object-bottom"
                        style={{ maxWidth: 'clamp(280px, 50vw, 784px)' }}
                        draggable={false}
                    />
                </div>

                {/* ── Layer 7: Supporting copy ─────────────────────────────────── */}
                <div
                    ref={supportRef}
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 9,
                        top: '50%',
                        right: 'clamp(20px, 5vw, 72px)',
                        transform: 'translateY(-30%)',
                        textAlign: 'right',
                        opacity: 0,
                    }}
                >
                    <p
                        className="font-sans font-semibold text-forest-900 uppercase"
                        style={{ fontSize: 'clamp(0.52rem, 0.95vw, 0.75rem)', letterSpacing: '0.3em' }}
                    >
                        CLOSER TO YOU
                    </p>
                    <p
                        className="font-sans font-medium text-forest-900 mt-3"
                        style={{ fontSize: 'clamp(0.5rem, 0.85vw, 0.68rem)', letterSpacing: '0.28em', opacity: 0.6 }}
                    >
                        LAKE CITY
                    </p>
                    <p
                        className="font-sans font-medium text-forest-900"
                        style={{ fontSize: 'clamp(0.5rem, 0.85vw, 0.68rem)', letterSpacing: '0.28em', opacity: 0.6 }}
                    >
                        BHOPAL
                    </p>
                </div>

                {/* Left decorative label */}
                <div
                    className="absolute pointer-events-none hidden md:flex flex-col"
                    style={{
                        zIndex: 9,
                        top: '50%',
                        left: 'clamp(20px, 5vw, 72px)',
                        transform: 'translateY(-30%)',
                    }}
                >
                    <div
                        className="h-px bg-forest-900 mb-3"
                        style={{ width: '32px', opacity: 0.4 }}
                    />
                    <p
                        className="font-sans font-medium text-forest-900 uppercase"
                        style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.65rem)', letterSpacing: '0.28em', opacity: 0.55 }}
                    >
                        A Chai Society Café
                    </p>
                </div>

                {/* ── Scroll indicator ────────────────────────────────────────── */}
                <div
                    ref={scrollRef}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    style={{ zIndex: 20, opacity: 0 }}
                    aria-hidden="true"
                >
                    <span
                        className="font-sans font-medium text-forest-900 uppercase"
                        style={{ fontSize: '0.6rem', letterSpacing: '0.3em' }}
                    >
                        Scroll
                    </span>
                    <div
                        className="relative overflow-hidden bg-forest-900/20"
                        style={{ width: '1px', height: '32px' }}
                    >
                        <div
                            className="absolute top-0 left-0 w-full bg-forest-900"
                            style={{
                                height: '40%',
                                animation: 'heroScrollBar 1.6s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes heroScrollBar {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(280%); }
        }
      `}</style>
        </section>
    );
}
