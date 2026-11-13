"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Work", href: "/work" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
];

const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adityamishra912" },
    { label: "GitHub", href: "https://github.com/adityamishra912" },
    { label: "LeetCode", href: "https://leetcode.com/adityamishra0912" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=aditya.mishra0989@gmail.com" },
];

export default function Navbar() {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const navTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const navUnderlineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 80;

            setScrolled(isScrolled);

            if (isScrolled) {
                setHasScrolled(true);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    // Navigation and social links hover animation
    useEffect(() => {
        const links = navLinkRefs.current;
        const texts = navTextRefs.current;
        const underlines = navUnderlineRefs.current;

        const cleanups: (() => void)[] = [];

        links.forEach((link, index) => {
            const text = texts[index];
            const underline = underlines[index];

            if (!link || !text || !underline) return;

            // Cursor-following movement.
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

                moveTextX(relativeX * 10);
                moveTextY(relativeY * 7);

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

    return (
        <>

            {/* Floating navbar: the WHOLE circle follows the cursor */}
            <div
                className={`fixed right-5 top-5 z-[100] sm:right-8 ${scrolled ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                style={{
                    transform: `translate(${cursor.x * 1.0}px, ${cursor.y * 1.0}px)`,
                    transition: hovered
                        ? "transform 80ms ease-out"
                        : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                    setCursor({ x: 0, y: 0 });
                }}
                onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();

                    const x = (event.clientX - rect.left) / rect.width - 0.5;
                    const y = (event.clientY - rect.top) / rect.height - 0.5;

                    setCursor({ x: x * 8, y: y * 8 });
                }}
            >
                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    aria-controls="floating-navigation"
                    tabIndex={scrolled ? 0 : -1}
                    onClick={() => setIsOpen((previous) => !previous)}
                    className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#171717] shadow-lg ${scrolled
                        ? "nav-button-enter"
                        : hasScrolled
                            ? "nav-button-exit"
                            : "nav-button-hidden"
                        }`}
                >
                    {/* Blue circle: scale-pop on hover */}
                    <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full bg-[#4f46e5] ${hovered || isOpen
                            ? "nav-circle-enter"
                            : "nav-circle-hidden"
                            }`}
                    />

                    {/* Three white lines */}

                    {/* Three lines with stronger cursor movement */}
                    <span
                        aria-hidden="true"
                        className="relative z-10 flex h-7 w-8 items-center justify-center"
                        style={{
                            transform: `translate(${cursor.x * 1.8}px, ${cursor.y * 1.8}px)`,
                            transition: hovered
                                ? "transform 60ms ease-out"
                                : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        {/* Top line */}
                        <span
                            className={`absolute h-[2px] w-full rounded-full bg-white transition-transform duration-300 ${isOpen ? "rotate-45" : "-translate-y-[7px]"
                                }`}
                        />

                        {/* Middle line */}
                        <span
                            className={`absolute h-[2px] w-full rounded-full bg-white transition-all duration-200 ${isOpen
                                ? "scale-x-0 opacity-0"
                                : "scale-x-100 opacity-100"
                                }`}
                        />

                        {/* Bottom line */}
                        <span
                            className={`absolute h-[2px] w-full rounded-full bg-white transition-transform duration-300 ${isOpen ? "-rotate-45" : "translate-y-[7px]"
                                }`}
                        />
                    </span>

                </button>
            </div>

            {/* Background overlay */}
            <button
                type="button"
                aria-label="Close menu overlay"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-[85] bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ${isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Slide-out menu */}
            <aside
                id="floating-navigation"
                aria-label="Main navigation"
                aria-hidden={!isOpen}
                className={`fixed right-0 top-0 z-[90] flex h-[100dvh] w-full flex-col bg-[#171717] px-7 pb-8 pt-28 text-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[420px] sm:px-10 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <p className="mb-7 border-b border-white/15 pb-4 text-[9px] uppercase tracking-[0.16em] text-white/45">
                    Navigation
                </p>

                <nav className="flex flex-col">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.label}
                            ref={(element) => {
                                navLinkRefs.current[index] = element;
                            }}
                            href={link.href}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => setIsOpen(false)}
                            style={{
                                transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                            }}
                            className="relative group flex items-center gap-3 py-1 text-[clamp(2rem,6vw,2.7rem)] leading-[1.25] tracking-[-0.055em] transition-colors duration-300 hover:text-cyan-300"
                        >
                            <span className="relative z-10 inline-block">
                                <span
                                    ref={(element) => {
                                        navTextRefs.current[index] = element;
                                    }}
                                    className="inline-block origin-center whitespace-nowrap"
                                >
                                    {link.label}
                                </span>

                                <span
                                    ref={(element) => {
                                        navUnderlineRefs.current[index] = element;
                                    }}
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current"
                                />
                            </span>
                        </a>
                    ))}
                </nav>

                <div className="mt-auto">
                    <p className="mb-4 text-[9px] uppercase tracking-[0.16em] text-white/45">
                        Socials
                    </p>

                    <div className="flex flex-wrap gap-5">
                        {socialLinks.map((social, index) => (
                            <a
                                key={social.label}
                                ref={(element) => {
                                    navLinkRefs.current[index + navLinks.length] = element;
                                }}
                                href={social.href}
                                target={social.label === "Email" ? undefined : "_blank"}
                                rel={
                                    social.label === "Email"
                                        ? undefined
                                        : "noopener noreferrer"
                                }
                                tabIndex={isOpen ? 0 : -1}
                                className="relative flex justify-center py-2 text-[10px] text-white/75 transition-colors hover:text-cyan-300"
                            >
                                <span
                                    ref={(element) => {
                                        navTextRefs.current[index + navLinks.length] = element;
                                    }}
                                    className="relative z-10 inline-block origin-center whitespace-nowrap"
                                >
                                    {social.label}
                                </span>

                                <span
                                    ref={(element) => {
                                        navUnderlineRefs.current[index + navLinks.length] = element;
                                    }}
                                    aria-hidden="true"
                                    className="absolute bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-current"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}