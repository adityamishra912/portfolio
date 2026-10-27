"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
    ArrowDownRight,
    ArrowUpRight,
    ExternalLink,
    FileText,
} from "lucide-react";

type Project = {
    slug: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    screenshot?: string;
    github: string;
    live?: string;
    gradient: string;
};

function GitHubIcon({ size = 14 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.8 2.02 3.3 1.42.1-.72.4-1.2.69-1.48-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.6 5.21-5.08 5.49.4.34.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
    );
}

const projects: Project[] = [
    {
        slug: "marketpulse",
        title: "MarketPulse",
        category: "Data Engineering & Development",
        tags: ["DATA ENGINEERING", "ANALYTICS"],
        description:
            "A market intelligence platform focused on data processing, insights, and real-time analytics.",
        screenshot: "/projects/marketpulse.png",
        github: "https://github.com/your-username/marketpulse",
        gradient: "linear-gradient(135deg, #07152f 0%, #2459dc 100%)",
    },
    {
        slug: "plantix",
        title: "Plantix",
        category: "Deep Learning & Computer Vision",
        tags: ["DEEP LEARNING", "COMPUTER VISION"],
        description:
            "An intelligent plant analysis system using computer vision to identify plant-related problems.",
        screenshot: "/projects/plantix.png",
        github: "https://github.com/your-username/plantix",
        gradient: "linear-gradient(135deg, #003b27 0%, #16844b 100%)",
    },
    {
        slug: "intellicast",
        title: "IntelliCast",
        category: "NLP, LLM & RAG",
        tags: ["NLP", "LLM", "RAG"],
        description:
            "An AI-powered application combining language models and retrieval to deliver contextual responses.",
        screenshot: "/projects/intellicast.png",
        github: "https://github.com/your-username/intellicast",
        gradient: "linear-gradient(135deg, #21103f 0%, #763bd5 100%)",
    },
    {
        slug: "risknexus",
        title: "RiskNexus",
        category: "Cybersecurity & Artificial Intelligence",
        tags: ["CYBERSECURITY", "AI", "RISK ANALYSIS"],
        description:
            "A cyber risk quantification platform designed to help organizations evaluate risk and prioritize security investments.",
        screenshot: "/projects/risknexus.png",
        github: "https://github.com/RajMaurya-07/Cyber_Risk_Quantification",
        live: "https://risknexus.vercel.app",
        gradient: "linear-gradient(135deg, #30120c 0%, #c2410c 100%)",
    },
    {
        slug: "granthanam",
        title: "Granthanam",
        category: "Full-Stack Development",
        tags: ["NEXT.JS", "SANSKRIT", "WEB DEVELOPMENT"],
        description:
            "A digital platform for exploring and preserving Sanskrit literature and traditional knowledge.",
        github: "https://github.com/your-username/granthanam",
        gradient: "linear-gradient(135deg, #24120c 0%, #98552c 100%)",
    },
    {
        slug: "kisanconnect",
        title: "KisanConnect",
        category: "Full-Stack Development & Data Integration",
        tags: ["REACT", "APIS", "AGRICULTURE"],
        description:
            "A farmer-focused marketplace integrating mandi prices and weather information.",
        github: "https://github.com/your-username/kisanconnect",
        gradient: "linear-gradient(135deg, #102619 0%, #39864a 100%)",
    },
];

const INITIAL_PROJECT_COUNT = 4;

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isPointerOverCard = useRef(false);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(
        INITIAL_PROJECT_COUNT
    );

    const activeProject =
        activeIndex !== null ? projects[activeIndex] : null;

    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;

    function activateProject(index: number) {
        setActiveIndex(index);
    }

    // Smooth cursor-following preview.
    useEffect(() => {
        const section = sectionRef.current;
        const card = previewRef.current;

        if (!section || !card) return;

        gsap.set(card, {
            autoAlpha: 0,
            x: 0,
            y: 0,
        });

        const moveX = gsap.quickTo(card, "x", {
            duration: 0.45,
            ease: "power3.out",
        });

        const moveY = gsap.quickTo(card, "y", {
            duration: 0.45,
            ease: "power3.out",
        });

        const handleMouseMove = (event: MouseEvent) => {
            if (window.innerWidth < 768) return;
            if (isPointerOverCard.current) return;

            const sectionRect = section.getBoundingClientRect();
            const cardWidth = card.offsetWidth;
            const cardHeight = card.offsetHeight;

            const mouseX = event.clientX - sectionRect.left;
            const mouseY = event.clientY - sectionRect.top;

            const gap = 24;
            const edgePadding = 12;

            // Place the card beside the cursor, flipping when necessary.
            let x = mouseX + gap;
            let y = mouseY - cardHeight / 2;

            if (x + cardWidth > sectionRect.width - edgePadding) {
                x = mouseX - cardWidth - gap;
            }

            if (y + cardHeight > section.scrollHeight - edgePadding) {
                y = mouseY - cardHeight - gap;
            }

            x = Math.max(
                edgePadding,
                Math.min(
                    x,
                    sectionRect.width - cardWidth - edgePadding
                )
            );

            y = Math.max(
                edgePadding,
                Math.min(
                    y,
                    section.scrollHeight - cardHeight - edgePadding
                )
            );

            moveX(x);
            moveY(y);
        };

        const handleSectionLeave = () => {
            isPointerOverCard.current = false;
            setActiveIndex(null);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleSectionLeave);

        return () => {
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseleave", handleSectionLeave);

            moveX.tween.kill();
            moveY.tween.kill();

            gsap.killTweensOf(card);
            if (contentRef.current) {
                gsap.killTweensOf(contentRef.current);
            }
        };
    }, []);

    // Show and hide the preview independently of its position.
    useEffect(() => {
        const card = previewRef.current;
        const content = contentRef.current;

        if (!card) return;

        if (activeIndex === null) {
            gsap.to(card, {
                autoAlpha: 0,
                duration: 0.22,
                ease: "power2.out",
                overwrite: "auto",
            });

            return;
        }

        gsap.to(card, {
            autoAlpha: 1,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto",
        });

        if (content) {
            gsap.fromTo(
                content,
                { opacity: 0.55, y: 8 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    ease: "power2.out",
                    overwrite: "auto",
                }
            );
        }
    }, [activeIndex]);

    function showAllProjects() {
        setVisibleCount(projects.length);
    }

    function showFewerProjects() {
        setVisibleCount(INITIAL_PROJECT_COUNT);
        setActiveIndex(null);
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-32"
        >
            {/* Section heading */}
            <div className="mb-12 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                    RECENT WORK
                </p>
            </div>

            {/* Project list */}
            <div className="relative border-t border-neutral-200 dark:border-neutral-800">
                {visibleProjects.map((project, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <button
                            key={project.slug}
                            type="button"
                            onMouseEnter={() => activateProject(index)}
                            onFocus={() => activateProject(index)}
                            onBlur={(event) => {
                                if (
                                    !event.currentTarget.parentElement?.contains(
                                        event.relatedTarget as Node | null
                                    )
                                ) {
                                    setActiveIndex(null);
                                }
                            }}
                            onClick={() => {
                                window.location.href = `/projects/${project.slug}`;
                            }}
                            className="group relative grid w-full grid-cols-1 items-center gap-3 border-b border-neutral-200 py-9 text-left transition-colors duration-500 dark:border-neutral-800 sm:py-12 lg:grid-cols-[1.35fr_0.85fr_auto] lg:gap-8 lg:py-14"
                            aria-label={`View ${project.title} case study`}
                        >
                            <span
                                className={`text-4xl font-medium tracking-[-0.065em] transition-colors duration-300 sm:text-5xl md:text-6xl lg:text-7xl ${isActive
                                        ? "text-neutral-400 dark:text-neutral-500"
                                        : "text-neutral-900 dark:text-neutral-100"
                                    }`}
                            >
                                {project.title}
                            </span>

                            <span
                                className={`text-sm tracking-tight transition-colors duration-300 sm:text-base ${isActive
                                        ? "text-neutral-400"
                                        : "text-neutral-600 dark:text-neutral-400"
                                    }`}
                            >
                                {project.category}
                            </span>

                            <ArrowUpRight
                                size={21}
                                className={`hidden transition-all duration-300 lg:block ${isActive
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-2 opacity-0"
                                    }`}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Floating interactive project preview.
                Keep this mounted so the GSAP mouse listener stays attached. */}
            <div
                ref={previewRef}
                className="pointer-events-auto absolute left-0 top-0 z-20 hidden w-[min(400px,34vw)] overflow-hidden rounded-[3px] p-6 text-white shadow-2xl shadow-black/25 md:block"
                style={{
                    background: activeProject?.gradient ?? "#111827",
                    minHeight: 360,
                    opacity: 0,
                    visibility: "hidden",
                }}
                aria-hidden={activeIndex === null}
                onMouseEnter={() => {
                    isPointerOverCard.current = true;
                }}
                onMouseLeave={() => {
                    isPointerOverCard.current = false;
                }}
            >
                {activeProject && (
                    <div ref={contentRef} className="flex flex-col">
                        {/* Technology tags */}
                        <div className="mb-5 flex min-h-4 flex-wrap gap-x-2 gap-y-1">
                            {activeProject.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/75"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Project screenshot */}
                        {activeProject.screenshot ? (
                            <div className="mb-5 aspect-video overflow-hidden rounded-sm border border-white/15 bg-black/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={activeProject.screenshot}
                                    alt={`${activeProject.title} project preview`}
                                    className="h-full w-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="mb-5 flex aspect-video items-center justify-center rounded-sm border border-white/15 bg-black/10">
                                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                                    Engineering / {activeProject.slug}
                                </span>
                            </div>
                        )}

                        {/* Project details */}
                        <h3 className="mb-2 text-3xl font-bold tracking-tight">
                            {activeProject.title}
                        </h3>

                        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/75">
                            {activeProject.description}
                        </p>

                        {/* Action links */}
                        <div className="mt-auto flex flex-wrap items-center gap-2">
                            <Link
                                href={`/projects/${activeProject.slug}`}
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition-transform duration-300 hover:scale-105"
                            >
                                <FileText size={14} />
                                Case study
                            </Link>

                            <a
                                href={activeProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-medium transition-colors duration-300 hover:bg-white/15"
                                aria-label={`${activeProject.title} GitHub repository`}
                            >
                                <GitHubIcon size={14} />
                                GitHub
                            </a>

                            {activeProject.live && (
                                <a
                                    href={activeProject.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs font-medium transition-colors duration-300 hover:bg-white/15"
                                >
                                    <ExternalLink size={13} />
                                    Live
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* View More */}
            {hasMore && (
                <div className="flex justify-center pt-12 lg:pt-16">
                    <button
                        type="button"
                        onClick={showAllProjects}
                        className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
                    >
                        View More Projects
                        <ArrowDownRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                        />
                    </button>
                </div>
            )}

            {/* Show Less */}
            {!hasMore && (
                <div className="flex justify-center pt-12 lg:pt-16">
                    <button
                        type="button"
                        onClick={showFewerProjects}
                        className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        Show Less
                        <ArrowDownRight
                            size={17}
                            className="rotate-180"
                        />
                    </button>
                </div>
            )}

            {/* Mobile project cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:hidden">
                {visibleProjects.map((project) => (
                    <article
                        key={`mobile-${project.slug}`}
                        className="rounded-sm p-6 text-white"
                        style={{ background: project.gradient }}
                    >
                        <div className="mb-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[9px] font-semibold uppercase tracking-widest text-white/75"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {project.screenshot && (
                            <div className="mb-5 aspect-video overflow-hidden rounded-sm border border-white/10 bg-black/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.screenshot}
                                    alt={`${project.title} preview`}
                                    className="h-full w-full object-cover"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            </div>
                        )}

                        <h3 className="mb-2 text-2xl font-bold">
                            {project.title}
                        </h3>

                        <p className="mb-5 text-sm leading-relaxed text-white/75">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black"
                            >
                                <FileText size={14} />
                                Case study
                            </Link>

                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs"
                            >
                                <GitHubIcon size={14} />
                                GitHub
                            </a>

                            {project.live && (
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2.5 text-xs"
                                >
                                    <ExternalLink size={13} />
                                    Live
                                </a>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}