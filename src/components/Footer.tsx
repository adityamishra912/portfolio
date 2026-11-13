"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const CONNECT_WITH_ME_ITEMS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adityamishra912" },
    { label: "GitHub", href: "https://github.com/adityamishra912" },
    { label: "LeetCode", href: "https://leetcode.com/adityamishra0912" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=aditya.mishra0989@gmail.com" },
];

const EXPLORE_ITEMS = [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/work" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    const spacerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);
    const roundedWrapRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const buttonRowRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const navUnderlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const buttonMotionRef = useRef<HTMLDivElement>(null);
    const buttonLinkRef = useRef<HTMLAnchorElement>(null);
    const [buttonHovered, setButtonHovered] = useState(false);
    const [buttonCursor, setButtonCursor] = useState({ x: 0, y: 0 });

    // Footer links animation
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

            // Rounded white boundary disappears completely at the end.
            if (p >= 0.995) {
                roundedWrap.style.height = "0px";
                roundedWrap.style.visibility = "hidden";
            } else {
                roundedWrap.style.visibility = "visible";
                roundedWrap.style.height = `${(1 - p) * window.innerHeight * 0.08}px`;
            }

            // Footer content rises into its final position.
            footerContent.style.transform = `translate3d(0, ${(1 - p) * 100}px, 0)`;

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
                className="footer-fixed invisible pointer-events-none fixed inset-0 z-10 flex h-dvh min-h-dvh flex-col justify-end overflow-hidden bg-[#141517] text-white"
            
            >
                <div
                    ref={footerContentRef}
                    className="relative w-full will-change-transform"
                >
                    <div className="mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-10 lg:px-16">
                        {/* Heading */}
                        <div className="relative pt-6 pb-10 sm:pb-14">
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
                                    {/* <span
                                        aria-hidden="true"
                                        className="inline-block h-[0.72em] w-[0.72em] shrink-0 translate-y-[0.05em] rounded-full bg-white"
                                    /> */}
                                    Let&apos;s work
                                </span>
                                <span className="block">together</span>
                            </h2>
                        </div>

                        {/* Floating CTA */}
                        <div
                            ref={buttonRowRef}
                            className="relative mb-1 h-20 border-t border-white/20 sm:mb-2 sm:h-24"
                        >


                            <div
                                ref={buttonRef}
                                className="absolute left-[76%] lg:left-[76%] top-1/2 z-20 h-28 w-28 lg:-translate-x-1/2 -translate-y-1/2 will-change-transform sm:h-36 sm:w-36"
                            >
                                {/* Cursor-following wrapper */}
                                <div
                                    ref={buttonMotionRef}
                                    className="h-full w-full"
                                    style={{
                                        transform: `translate(${buttonCursor.x * 1.0}px, ${buttonCursor.y * 1.0}px)`,
                                        transition: buttonHovered
                                            ? "transform 80ms ease-out"
                                            : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                                    }}
                                    onMouseEnter={() => setButtonHovered(true)}
                                    onMouseLeave={() => {
                                        setButtonHovered(false);
                                        setButtonCursor({ x: 0, y: 0 });
                                    }}
                                    onMouseMove={(event) => {
                                        const rect = event.currentTarget.getBoundingClientRect();

                                        const x = (event.clientX - rect.left) / rect.width - 0.5;
                                        const y = (event.clientY - rect.top) / rect.height - 0.5;

                                        setButtonCursor({ x: x * 8, y: y * 8 });
                                    }}
                                >
                                    <Link
                                        ref={buttonLinkRef}
                                        href="/contact"
                                        className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#6366f1] text-sm font-medium text-[#141517] sm:text-base"
                                    >
                                        {/* Blue hover background */}
                                        <span
                                            aria-hidden="true"
                                            className={`absolute inset-0 rounded-full bg-[#4f46e5] ${buttonHovered
                                                ? "nav-circle-enter"
                                                : "nav-circle-hidden"
                                                }`}
                                        />

                                        {/* Text follows cursor more strongly */}
                                        <span
                                            className="relative z-10 text-white"
                                            style={{
                                                transform: `translate(${buttonCursor.x * 1.8}px, ${buttonCursor.y * 1.8}px)`,
                                                transition: buttonHovered
                                                    ? "transform 60ms ease-out"
                                                    : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                                            }}
                                        >
                                            Get in touch
                                        </span>
                                    </Link>
                                </div>
                            </div>


                        </div>

                        {/* Connect with me */}

                        <div className="mt-12 grid grid-cols-2 grid-rows-1">
                            {/* Connect with me */}
                            <div className="flex flex-col items-center">
                                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/45">
                                    Connect with me
                                </p>

                                <ul className="flex flex-col items-start gap-4 text-sm text-white/80 sm:text-base">

                                    {CONNECT_WITH_ME_ITEMS.map((item, index) => (
                                        <li key={item.label}>
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
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Website navigation */}
                            <div className="flex flex-col items-center">
                                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/45">
                                    Explore
                                </p>

                                <ul className="flex flex-col items-start gap-4 text-sm text-white/80 sm:text-base">
                                    {EXPLORE_ITEMS.map((item, index) => (
                                        <li key={item.label}>
                                            <Link
                                                key={item.label}
                                                ref={(element) => {
                                                    navLinkRefs.current[index + CONNECT_WITH_ME_ITEMS.length] = element;
                                                }}
                                                href={item.href}
                                                className="relative flex min-w-12 justify-center px-2 py-2 text-sm sm:px-3 sm:text-base"
                                            >
                                                <span
                                                    ref={(element) => {
                                                        navTextRefs.current[index + CONNECT_WITH_ME_ITEMS.length] = element;
                                                    }}
                                                    className="relative z-10 inline-block origin-center whitespace-nowrap"
                                                >
                                                    {item.label}
                                                </span>

                                                <span
                                                    ref={(element) => {
                                                        navUnderlineRefs.current[index + CONNECT_WITH_ME_ITEMS.length] = element;
                                                    }}
                                                    aria-hidden="true"
                                                    className="absolute bottom-1 left-2 right-2 h-px origin-center scale-x-0 bg-current sm:left-3 sm:right-3"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
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