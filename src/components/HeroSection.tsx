"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
];

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const portraitRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const navUnderlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Navbar animation
    useEffect(() => {
        const links = navLinkRefs.current;
        const texts = navTextRefs.current;
        const underlines = navUnderlineRefs.current;

        const cleanups: (() => void)[] = [];

        links.forEach((link, index) => {
            const text = texts[index];
            const underline = underlines[index];

            if (!link || !text || !underline) return;

            // Smooth cursor-following movement in both directions.
            const moveTextX = gsap.quickTo(text, "x", {
                duration: 0.3,
                ease: "power3.out",
            });

            const moveTextY = gsap.quickTo(text, "y", {
                duration: 0.3,
                ease: "power3.out",
            });

            const moveUnderlineX = gsap.quickTo(underline, "x", {
                duration: 0.45,
                ease: "power3.out",
            });

            const moveUnderlineY = gsap.quickTo(underline, "y", {
                duration: 0.45,
                ease: "power3.out",
            });

            const handleMouseMove = (event: MouseEvent) => {
                const bounds = link.getBoundingClientRect();

                // Normalize cursor position relative to the link's center.
                const relativeX = gsap.utils.clamp(
                    -1,
                    1,
                    (event.clientX - (bounds.left + bounds.width / 2)) /
                    (bounds.width / 2)
                );

                const relativeY = gsap.utils.clamp(
                    -1,
                    1,
                    (event.clientY - (bounds.top + bounds.height / 2)) /
                    (bounds.height / 2)
                );

                // Text responds more strongly.
                moveTextX(relativeX * 10);
                moveTextY(relativeY * 7);

                // Underline follows with reduced intensity.
                moveUnderlineX(relativeX * 3);
                moveUnderlineY(relativeY * 2);
            };

            const handleMouseEnter = () => {
                gsap.to(text, {
                    scale: 1.08,
                    duration: 0.3,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            };

            const handleMouseLeave = () => {
                // Reset through the same quickTo functions.
                // Do not create competing x/y tweens.
                moveTextX(0);
                moveTextY(0);
                moveUnderlineX(0);
                moveUnderlineY(0);

                gsap.to(text, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                gsap.to(underline, {
                    scaleX: 0,
                    duration: 0.35,
                    ease: "power3.inOut",
                    overwrite: "auto",
                });
            };

            link.addEventListener("mousemove", handleMouseMove);
            link.addEventListener("mouseenter", handleMouseEnter);
            link.addEventListener("mouseleave", handleMouseLeave);

            cleanups.push(() => {
                link.removeEventListener("mousemove", handleMouseMove);
                link.removeEventListener("mouseenter", handleMouseEnter);
                link.removeEventListener("mouseleave", handleMouseLeave);

                gsap.killTweensOf([text, underline]);
            });
        });

        return () => cleanups.forEach((cleanup) => cleanup());
    }, []);



    // Image delay animation
    useEffect(() => {
        const portrait = portraitRef.current;
        if (!portrait) return;

        const ctx = gsap.context(() => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) return;

            // Subtle scroll parallax
            gsap.to(portraitRef.current, {
                yPercent: 25,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    // Text entrance — synchronized with splash screen
    useEffect(() => {
        const role = roleRef.current;
        const title = titleRef.current;

        if (!role || !title) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Reduced motion: show text immediately.
        if (prefersReducedMotion) {
            gsap.set([role, title], {
                autoAlpha: 1,
                clearProps: "transform",
            });

            return;
        }

        // Keep text hidden until the splash screen finishes.
        gsap.set(role, {
            autoAlpha: 0,
            y: 35,
        });

        gsap.set(title, {
            autoAlpha: 0,
            yPercent: 110,
        });

        let intro: gsap.core.Timeline | undefined;

        const handleSplashComplete = () => {
            // Prevent duplicate playback.
            if (intro) return;

            intro = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            intro
                .to(role, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                })
                .to(
                    title,
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 1.1,
                    },
                    "-=0.3"
                );
        };

        window.addEventListener(
            "portfolio:splash-complete",
            handleSplashComplete
        );

        return () => {
            window.removeEventListener(
                "portfolio:splash-complete",
                handleSplashComplete
            );

            intro?.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="home"
            className="h-screen bg-[#B8BAB9] relative overflow-hidden"
            aria-label="Introduction"
        >
            {/* Navbar */}
            <nav
                aria-label="Main navigation"
                className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-[#252525] sm:px-8 sm:py-7 lg:px-[4%]"
            >
                <Link
                    href="#home"
                    className="text-sm font-medium tracking-tight sm:text-base"
                >
                    © Aditya Mishra
                </Link>

                <div className="flex items-center gap-1 sm:gap-3">
                    {NAV_ITEMS.map((item, index) => (
                        <Link
                            key={item.label}
                            ref={(element) => {
                                navLinkRefs.current[index] = element;
                            }}
                            href={item.href}
                            className="relative flex min-w-12 justify-center px-2 py-2 text-sm sm:px-3 sm:text-base"
                        >
                            <span
                                ref={(element) => {
                                    navTextRefs.current[index] = element;
                                }}
                                className="relative z-10 inline-block origin-center whitespace-nowrap"
                            >
                                {item.label}
                            </span>

                            <span
                                ref={(element) => {
                                    navUnderlineRefs.current[index] = element;
                                }}
                                aria-hidden="true"
                                className="absolute bottom-1 left-2 right-2 h-px origin-center scale-x-0 bg-current sm:left-3 sm:right-3"
                            />
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Main portrait — stable positioning */}
            <div className="absolute inset-x-0 bottom-0 h-full flex justify-center pointer-events-none">
                <div
                    ref={portraitRef}
                    className="absolute inset-0 flex items-end justify-center"
                >
                    <img
                        src="/media/me.png"
                        alt="Portrait of Aditya Mishra"
                        className="
                            h-[110%] w-auto max-w-[95vw] object-contain object-bottom
                            max-sm:h-[88%]
                            sm:translate-y-0
                            lg:translate-y-[12%]
                            
                        "
                    />
                </div>
            </div>

            {/* Professional positioning */}
            <div className="absolute inset-0 z-10 pointer-events-none text-[#252525]">
                <div
                    ref={roleRef}
                    className="absolute top-[46%] left-[4%] max-w-[280px] -translate-y-1/2"
                >
                    <span className="lg:ml-6 mb-3 block text-[10px] font-semibold tracking-[0.15em] text-black/60">
                        BUILDING FOR THE FUTURE
                    </span>

                    <h2 className="lg:ml-6 text-xl lg:text-2xl font-medium leading-[1.4] tracking-tight">
                        Software Engineer
                    </h2>
                </div>
            </div>

            {/* Oversized name */}
            <div
                className="absolute bottom-5 max-sm:bottom-[calc(5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[3] overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <h1
                    ref={titleRef}
                    className="w-max text-center whitespace-nowrap
                   text-[15.1vw] xl:text-[17rem]
                   max-sm:text-[16vw]
                   font-normal leading-[0.88]
                   tracking-[-0.095em] text-[#252525]"
                >
                    Aditya Mishra
                </h1>
            </div>

        </section>
    );
}