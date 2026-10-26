
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);

    // In animation with on-scroll
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) return;

            // Heading and eyebrow reveal
            gsap.fromTo(
                ".about-heading",
                {
                    y: 40,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 50%",
                        end: "top 25%",
                        scrub: 0,
                    },
                }
            );

            // Paragraph reveal
            gsap.fromTo(
                ".about-copy",
                {
                    y: 30,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 50%",
                        end: "top 30%",
                        scrub: 0,
                    },
                }
            );

            // Portrait reveal
            gsap.fromTo(
                ".about-portrait",
                {
                    y: 50,
                    scale: 0.95,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 50%",
                        end: "top 25%",
                        scrub: 0,
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    // 3D Hover Handler

    const handle3DMouseMove = (
        event: React.MouseEvent<HTMLElement>,
        target: HTMLElement | null,
        intensity = 20
    ) => {
        if (
            !target ||
            window.matchMedia("(max-width: 767px)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();

        // Cursor position relative to the center (-0.5 to 0.5)
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(target, {
            // Stronger 3D rotation
            rotateY: x * intensity * 1.5,
            rotateX: -y * intensity * 1.5,

            // Magnetic movement: the circle follows the cursor
            x: x * 35,
            y: y * 35,

            // Slight enlargement on hover
            scale: 1.05,

            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    const handle3DMouseLeave = (target: HTMLElement | null) => {
        if (!target) return;

        gsap.to(target, {
            rotateX: 0,
            rotateY: 0,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
        });
    };


    // Image hover animation
    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (
            window.matchMedia("(max-width: 767px)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const image = imageRef.current;
        if (!image) return;

        const rect = event.currentTarget.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        gsap.to(image, {
            rotateY: (x - 0.5) * 12,
            rotateX: (0.5 - y) * 12,
            scale: 1.025,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleMouseLeave = () => {
        if (!imageRef.current) return;

        gsap.to(imageRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
        });
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            aria-labelledby="about-heading"
            className="w-full overflow-hidden bg-white py-20 text-black sm:py-24 lg:py-36"
        >
            <div className="mx-auto grid w-[88%] max-w-[1200px] grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_0.8fr] md:gap-12 lg:gap-28">
                {/* Left: About content */}
                <div className="max-w-2xl">

                    {/* Heading */}

                    <div className="about-heading mb-4 flex justify-start">
                        {/* Perspective must be on the parent */}
                        <div className="[perspective:800px]">
                            <div
                                ref={circleRef}
                                onMouseMove={(event) =>
                                    handle3DMouseMove(event, circleRef.current, 20)
                                }
                                onMouseLeave={() =>
                                    handle3DMouseLeave(circleRef.current)
                                }
                                className="group relative flex aspect-square w-38 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#1c1c1f] [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
                            >
                                <div className="absolute inset-0 translate-y-full rounded-full bg-[#4659ed] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:transition-none" />

                                <h2 className="relative z-10 text-2xl font-semibold tracking-tight text-white">
                                    About Me
                                </h2>
                            </div>
                        </div>
                    </div>


                    {/* Paragraph */}

                    <div className="space-y-5 font-[var(--font-inter)] text-base leading-8 text-neutral-700 sm:text-[17px]">
                        <p className="about-copy">
                            I&apos;m a computer science student who enjoys
                            understanding how things work — and building
                            them from the ground up.
                        </p>

                        <p className="about-copy">
                            My interests span full-stack engineering,
                            artificial intelligence, and the systems that
                            bring software to life.
                        </p>

                        <p className="about-copy">
                            Whether I&apos;m developing an application or
                            experimenting with language models, I like going
                            beyond making things work to understanding why
                            they work.
                        </p>

                        <p className="about-copy">
                            I&apos;m continuously learning, building, and
                            exploring ideas that challenge me to become a
                            better engineer.
                        </p>
                    </div>

                    <a
                        href="#projects"
                        className="mt-9 inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-semibold text-black transition-all duration-300 hover:gap-5"
                    >
                        Explore my work
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                {/* Right: 3D portrait */}
                <div className="w-full md:justify-self-end md:max-w-[440px]">
                    <div
                        className="about-portrait [perspective:1000px]"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            ref={imageRef}
                            src="/media/about-me.jpeg"
                            alt="Portrait of me"
                            width={600}
                            height={800}
                            loading="lazy"
                            className="aspect-[3/4] w-full rounded-sm bg-neutral-100 object-cover [transform-style:preserve-3d] [backface-visibility:hidden] motion-reduce:transform-none"
                        />
                    </div>

                    <p className="mt-4 flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-xs">
                        <span className="h-2 w-2 rounded-full bg-black" />
                        Computer Science · Bhopal, India
                    </p>
                </div>

            </div>
        </section>
    );
}
