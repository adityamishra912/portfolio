
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const portraitRef = useRef<HTMLDivElement>(null);

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

    return (
        <section
            ref={sectionRef}
            id="home"
            className="h-screen bg-[#B8BAB9] relative overflow-hidden"
            aria-label="Introduction"
        >
            {/* Header */}


            {/* Main portrait */}
            <div
                ref={portraitRef}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[110%] w-full flex justify-center pointer-events-none"
            >
                <img
                    src="/media/me.png"
                    alt="Portrait of Aditya Mishra"
                    className="mt-30 h-full w-auto max-w-[95vw] object-contain object-bottom"
                />
            </div>

            {/* Professional positioning */}
            <div className="absolute inset-0 z-10 pointer-events-none text-[#252525]">
                <div className="absolute top-[46%] left-[4%] max-w-[280px] -translate-y-1/2">
                    <span className="lg:ml-6 mb-3 block text-[10px] font-semibold tracking-[0.15em] text-black/60">
                        BUILDING FOR THE FUTURE
                    </span>

                    <h2 className="lg:ml-6 text-xl lg:text-2xl font-medium leading-[1.4] tracking-tight">
                        Software Engineer
                        {/* <br />
                        &amp; AI Builder */}
                    </h2>
                </div>

                {/* <a
                    href="#work"
                    className="pointer-events-auto absolute top-[35%] right-[7%] flex flex-col items-start gap-6 text-sm"
                >
                    <span className="text-4xl transition-transform duration-300 hover:translate-x-1 hover:translate-y-1">
                        ↘
                    </span>
                    <span>Explore selected work</span>
                </a> */}
            </div>

            {/* Oversized name */}
            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[3] overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <h1 className="w-max text-center whitespace-nowrap text-[15.1vw] xl:text-[17rem] font-normal leading-[0.88] tracking-[-0.095em] text-[#252525]">
                    Aditya Mishra
                </h1>
            </div>

        </section>
    );
}
