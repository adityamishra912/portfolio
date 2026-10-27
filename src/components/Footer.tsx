"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const EMAIL = "aadarshrai1801@gmail.com";
const PHONE = "+918434501384";

export default function Footer() {
    const spacerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);
    const roundedWrapRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const buttonRowRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const spacer = spacerRef.current;
        const footer = footerRef.current;
        const footerContent = footerContentRef.current;
        const roundedWrap = roundedWrapRef.current;
        const heading = headingRef.current;
        const button = buttonRef.current;
        const buttonRow = buttonRowRef.current;
        const arrow = arrowRef.current;

        if (
            !spacer ||
            !footer ||
            !footerContent ||
            !roundedWrap ||
            !heading ||
            !button ||
            !buttonRow ||
            !arrow
        ) {
            return;
        }

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let targetProgress = 0;
        let currentProgress = 0;
        let rafId = 0;
        let resizeObserver: ResizeObserver | undefined;

        const updateSpacer = () => {
            spacer.style.height = `${Math.max(
                window.innerHeight * 0.9,
                footerContent.offsetHeight
            )}px`;
        };

        const calculateProgress = () => {
            const rect = spacer.getBoundingClientRect();
            const height = rect.height || window.innerHeight;

            targetProgress = Math.max(
                0,
                Math.min(1, (window.innerHeight - rect.top) / height)
            );

            // Reveal the fixed footer only when the spacer approaches the viewport.
            footer.classList.toggle(
                "footer-visible",
                window.innerHeight - rect.top > -40
            );

            if (!rafId) {
                rafId = requestAnimationFrame(render);
            }
        };

        const render = () => {
            rafId = 0;

            if (reduceMotion) {
                currentProgress = targetProgress;
            } else {
                currentProgress += (targetProgress - currentProgress) * 0.14;

                if (Math.abs(targetProgress - currentProgress) < 0.0005) {
                    currentProgress = targetProgress;
                }
            }

            const p = currentProgress;

            // Original rounded-curtain effect.
            roundedWrap.style.height = `${(1 - p) * 8}vh`;

            // Footer content rises into its final position.
            footerContent.style.transform = `translate3d(0, ${(1 - p) * 280}px, 0)`;

            // Heading has a smaller parallax offset.
            heading.style.transform = `translate3d(0, ${(1 - p) * 60}px, 0)`;

            // Arrow rotates back to its resting angle.
            arrow.style.transform = `rotate(${(1 - p) * 15}deg)`;

            // CTA moves from the left toward the center of its final position.
            const maxShiftLeft = Math.min(buttonRow.offsetWidth * 0.35, 400);
            const shiftX = -maxShiftLeft * (1 - Math.pow(p, 0.85));
            const shiftY = (1 - p) * 45;
            const tilt = (1 - p) * -10;

            button.style.transform =
                `translate3d(calc(-50% + ${shiftX}px), ` +
                `calc(-50% + ${shiftY}px), 0) rotate(${tilt}deg)`;

            if (
                !reduceMotion &&
                Math.abs(targetProgress - currentProgress) >= 0.0005
            ) {
                rafId = requestAnimationFrame(render);
            }
        };

        const handleResize = () => {
            updateSpacer();
            calculateProgress();
        };

        if ("ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(updateSpacer);
            resizeObserver.observe(footerContent);
        }

        updateSpacer();
        calculateProgress();

        window.addEventListener("scroll", calculateProgress, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", calculateProgress);
            window.removeEventListener("resize", handleResize);

            resizeObserver?.disconnect();

            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            {/* Rounded boundary at the end of the foreground page */}
            <div
                aria-hidden="true"
                className="pointer-events-none relative z-20 -mb-px h-0"
            >
                <div
                    ref={roundedWrapRef}
                    className="relative h-[8vh] -translate-y-[2px] overflow-hidden will-change-[height]"
                >
                    <div className="absolute left-1/2 top-0 h-[750%] w-[150%] -translate-x-1/2 -translate-y-[86.666%] rounded-[50%] bg-white" />
                </div>
            </div>

            {/* Invisible scroll track: never render a visible blank block */}
            <div
                ref={spacerRef}
                aria-hidden="true"
                className="footer-scroll-track pointer-events-none relative z-20 w-full"
            />

            {/* Fixed footer sits behind the foreground page */}
            <section
                ref={footerRef}
                id="contact"
                aria-label="Contact and social links"
                className="footer-fixed invisible pointer-events-none fixed inset-x-0 bottom-0 z-10 flex h-screen min-h-screen flex-col justify-end overflow-hidden bg-[#141517] text-white"
            >
                <div
                    ref={footerContentRef}
                    className="relative w-full will-change-transform"
                >
                    <div className="mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-10 lg:px-16">
                        {/* Heading */}
                        <div className="relative pb-10 sm:pb-14">
                            <div
                                ref={arrowRef}
                                className="absolute bottom-5 right-0 will-change-transform sm:bottom-8"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M2 12 12 2M3 2h9v9"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>

                            <h2
                                ref={headingRef}
                                className="text-[clamp(3rem,7.5vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em] will-change-transform"
                            >
                                <span className="flex items-center gap-[0.14em]">
                                    <span
                                        aria-hidden="true"
                                        className="inline-block h-[0.72em] w-[0.72em] shrink-0 translate-y-[0.05em] rounded-full bg-white"
                                    />
                                    Let&apos;s work
                                </span>
                                <span className="block">together</span>
                            </h2>
                        </div>

                        {/* Floating CTA */}
                        <div
                            ref={buttonRowRef}
                            className="relative mb-10 h-20 border-t border-white/20 sm:mb-14 sm:h-24"
                        >
                            <div
                                ref={buttonRef}
                                className="absolute right-0 top-0 z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 will-change-transform sm:h-36 sm:w-36"
                            >
                                <Link
                                    href="/contact"
                                    className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white text-sm font-medium text-[#141517] transition-colors duration-300 hover:bg-cyan-300 sm:text-base"
                                >
                                    <span className="relative z-10">Get in touch</span>
                                </Link>
                            </div>
                        </div>

                        {/* Connect with me */}
                        <div>
                            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/45">
                                Connect with me
                            </p>

                            <ul className="flex flex-col items-start gap-4 text-sm text-white/80 sm:text-base">
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/aadarshrai1801/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-cyan-300"
                                    >
                                        LinkedIn ↗
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://github.com/Aadarshrai1801"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-cyan-300"
                                    >
                                        GitHub ↗
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://leetcode.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-cyan-300"
                                    >
                                        LeetCode ↗
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom footer */}

                </div>

                {/* Subtle gradient at the top of the dark footer */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#1c1d20] to-transparent opacity-75"
                />
            </section>
        </>
    );
}

function DubaiTime() {
    const [time, setTime] = useState("--:-- GST");

    useEffect(() => {
        const update = () => {
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Dubai",
                }).format(new Date()) + " GST"
            );
        };

        update();
        const id = window.setInterval(update, 15000);

        return () => window.clearInterval(id);
    }, []);

    return <p className="text-xs text-white/80">{time}</p>;
}