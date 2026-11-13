"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
    siPython,
    siJavascript,
    siTypescript,
    siCplusplus,
    siHtml5,
    siCss,
    siReact,
    siNextdotjs,
    siTailwindcss,
    siGsap,
    siNodedotjs,
    siExpress,
    siSpring,
    siFastapi,
    siMysql,
    siPostgresql,
    siMongodb,
    siFirebase,
    siSupabase,
    siPytorch,
    siHuggingface,
    siDocker,
    siGit,
    siGithub,
    siLinux,
    siVercel,
} from "simple-icons";

type BrandIcon = {
    path: string;
    title: string;
};

type Technology = {
    name: string;
    icon?: BrandIcon;
    monogram?: string;
};

const categories: {
    title: string;
    technologies: Technology[];
}[] = [
        {
            title: "LANGUAGES",
            technologies: [
                { name: "Java", monogram: "J" },
                { name: "Python", icon: siPython },
                { name: "JavaScript", icon: siJavascript },
                { name: "TypeScript", icon: siTypescript },
                { name: "C++", icon: siCplusplus },
            ],
        },
        {
            title: "FRONTEND",
            technologies: [
                { name: "HTML5", icon: siHtml5 },
                { name: "CSS3", icon: siCss },
                { name: "React", icon: siReact },
                { name: "Next.js", icon: siNextdotjs },
                { name: "Tailwind CSS", icon: siTailwindcss },
                { name: "GSAP", icon: siGsap },
            ],
        },
        {
            title: "BACKEND",
            technologies: [
                { name: "Node.js", icon: siNodedotjs },
                { name: "Express", icon: siExpress },
                { name: "Spring", icon: siSpring },
                { name: "FastAPI", icon: siFastapi },
                { name: "REST APIs", monogram: "API" },
            ],
        },
        {
            title: "DATABASES",
            technologies: [
                { name: "MySQL", icon: siMysql },
                { name: "PostgreSQL", icon: siPostgresql },
                { name: "MongoDB", icon: siMongodb },
                { name: "Firebase", icon: siFirebase },
                { name: "Supabase", icon: siSupabase },
            ],
        },
        {
            title: "AI / MACHINE LEARNING",
            technologies: [
                { name: "PyTorch", icon: siPytorch },
                { name: "Hugging Face", icon: siHuggingface },
                { name: "LangChain", monogram: "LC" },
                { name: "LangGraph", monogram: "LG" },
                { name: "RAG", monogram: "RAG" },
                { name: "Gemini API", monogram: "G" },
            ],
        },
        {
            title: "TOOLS & DEPLOYMENT",
            technologies: [
                { name: "Docker", icon: siDocker },
                { name: "Git", icon: siGit },
                { name: "GitHub", icon: siGithub },
                { name: "Linux", icon: siLinux },
                { name: "Vercel", icon: siVercel },
            ],
        },
    ];

function TechnologyIcon({ tech }: { tech: Technology }) {
    if (tech.icon) {
        return (
            <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 fill-current text-black"
                role="img"
                aria-label={`${tech.name} logo`}
            >
                <path d={tech.icon.path} />
            </svg>
        );
    }

    return (
        <div className="flex h-9 w-9 items-center justify-center text-black">
            <span className="text-sm font-bold tracking-tight">
                {tech.monogram}
            </span>
        </div>
    );
}

export default function TechStack() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop animation only
            mm.add("(min-width: 768px)", () => {
                const headings = gsap.utils.toArray<HTMLElement>(
                    ".stack-category"
                );

                const groups = gsap.utils.toArray<HTMLElement>(
                    ".stack-group"
                );

                const progressSteps = gsap.utils.toArray<HTMLElement>(
                    ".stack-progress-step"
                );

                gsap.set(headings, {
                    autoAlpha: 0,
                    yPercent: 100,
                });

                gsap.set(groups, {
                    autoAlpha: 0,
                    yPercent: 15,
                });

                gsap.set(headings[0], {
                    autoAlpha: 1,
                    yPercent: 0,
                });

                gsap.set(groups[0], {
                    autoAlpha: 1,
                    yPercent: 0,
                });

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: `+=${categories.length * 100}%`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                });

                categories.forEach((category, index) => {
                    const heading = headings[index];
                    const group = groups[index];
                    const items = group.querySelectorAll(".stack-item");

                    const stage = index * 1.5;

                    if (index > 0) {
                        timeline.to(
                            headings[index - 1],
                            {
                                yPercent: -100,
                                autoAlpha: 0,
                                duration: 0.4,
                            },
                            stage
                        );

                        timeline.to(
                            heading,
                            {
                                yPercent: 0,
                                autoAlpha: 1,
                                duration: 0.4,
                            },
                            stage
                        );

                        timeline.to(
                            groups[index - 1],
                            {
                                yPercent: -15,
                                autoAlpha: 0,
                                duration: 0.4,
                            },
                            stage
                        );

                        timeline.to(
                            group,
                            {
                                yPercent: 0,
                                autoAlpha: 1,
                                duration: 0.4,
                            },
                            stage
                        );

                        // Update vertical progress indicator
                        timeline.to(
                            progressSteps[index - 1],
                            {
                                height: 12,
                                backgroundColor: "#C4C4C4",
                                duration: 0.3,
                            },
                            stage
                        );

                        timeline.to(
                            progressSteps[index],
                            {
                                height: 28,
                                backgroundColor: "#171717",
                                duration: 0.3,
                            },
                            stage
                        );
                    }

                    timeline.fromTo(
                        items,
                        {
                            y: 35,
                            autoAlpha: 0,
                        },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.4,
                            stagger: 0.09,
                            ease: "power2.out",
                        },
                        stage + 0.25
                    );

                    timeline.to(
                        items,
                        {
                            y: -30,
                            autoAlpha: 0,
                            duration: 0.35,
                            stagger: 0.04,
                            ease: "power2.in",
                        },
                        stage + 1.05
                    );

                    //Progress bar
                    gsap.set(progressSteps, {
                        height: 12,
                        backgroundColor: "#C4C4C4",
                    });

                    gsap.set(progressSteps[0], {
                        height: 28,
                        backgroundColor: "#171717",
                    });
                });

                return () => {
                    timeline.scrollTrigger?.kill();
                    timeline.kill();
                };
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative w-full bg-white md:h-screen md:overflow-hidden"
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-24 md:h-full md:px-12 md:py-12 lg:px-24">

                {/* SECTION HEADING */}
                <div className="md:mt-15 mb-1 md:mb-8">
                    <p className="mb-5 text-xs tracking-[0.2em] text-neutral-400 uppercase">
                        WHAT I WORK WITH
                    </p>

                    <div className="hidden lg:block h-px w-full bg-neutral-200" />
                </div>

                {/* DESKTOP: PINNED ANIMATION */}
                <div className="hidden min-h-0 flex-1 items-center md:flex">

                    {/* LEFT CATEGORY PANEL */}
                    <div className="relative flex h-[62vh] w-[42%] items-center overflow-hidden border border-black/20 px-2 lg:px-12">

                        <div className="relative h-[110px] w-full overflow-hidden">
                            {categories.map((category) => (
                                <h3
                                    key={category.title}
                                    className="px-4 stack-category absolute inset-0 flex items-center text-3xl font-medium tracking-tight text-black lg:text-5xl xl:text-6xl"
                                >
                                    {category.title}
                                </h3>
                            ))}

                            {/* VERTICAL SCROLL PROGRESS */}
                            <div
                                className="stack-progress absolute right-1 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2"
                                aria-label="Technology category progress"
                            >
                                {categories.map((category, index) => (
                                    <span
                                        key={category.title}
                                        title={category.title}
                                        className="stack-progress-step block h-3 w-[3px] rounded-full bg-neutral-300"
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT TECHNOLOGY PANEL */}
                    <div className="relative flex h-[62vh] w-[58%] items-center justify-center overflow-hidden px-6 lg:px-12">

                        {categories.map((category) => (
                            <div
                                key={category.title}
                                className="stack-group absolute grid w-full max-w-[620px] grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:gap-x-8 lg:gap-y-14"
                            >
                                {category.technologies.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="stack-item flex flex-col items-center justify-center gap-3 text-center"
                                    >
                                        <TechnologyIcon tech={tech} />

                                        <span className="text-sm font-medium text-black lg:text-base">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}

                    </div>
                </div>

                {/* MOBILE: NORMAL LIST, NO ANIMATION */}
                <div className="md:hidden">

                    {categories.map((category, index) => (
                        <div
                            key={category.title}
                            className="border-t border-neutral-200 py-7"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-lg font-medium tracking-tight text-black">
                                    {String(index + 1).padStart(2, "0")} / {category.title}
                                </h3>

                                <span className="text-[10px] tracking-wider text-neutral-400">
                                    {String(category.technologies.length).padStart(2, "0")} TECHNOLOGIES
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-x-2 gap-y-3">
                                {category.technologies.map((tech, techIndex) => (
                                    <span
                                        key={tech.name}
                                        className="text-sm text-neutral-600"
                                    >
                                        {tech.name}
                                        {techIndex !== category.technologies.length - 1 && (
                                            <span className="ml-2 text-neutral-300">·</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-neutral-200 pt-6 text-[10px] tracking-[0.15em] text-neutral-400">
                        CONTINUOUSLY LEARNING · BUILDING · EXPERIMENTING
                    </div>

                </div>

            </div>
        </section>
    );
}