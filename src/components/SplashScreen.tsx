"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOGOS = [
    {
        name: "Next.js",
        src: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
    },
    {
        name: "Spring Boot",
        src: "https://cdn.simpleicons.org/springboot/FFFFFF",
    },
    {
        name: "MySQL",
        src: "https://cdn.simpleicons.org/mysql/FFFFFF",
    },
    {
        name: "Docker",
        src: "https://cdn.simpleicons.org/docker/FFFFFF",
    },
    {
        name: "Vercel",
        src: "https://cdn.simpleicons.org/vercel/FFFFFF",
    },
];

export default function SplashScreen() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const overlay = overlayRef.current;

        if (!overlay) return;

        // Keep the scrollbar visible while preventing page scrolling.
        const preventScroll = (event: Event) => {
            event.preventDefault();
        };

        const preventScrollKeys = (event: KeyboardEvent) => {
            const scrollKeys = [
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " ",
            ];

            if (scrollKeys.includes(event.key)) {
                event.preventDefault();
            }
        };

        window.addEventListener("wheel", preventScroll, {
            passive: false,
        });

        window.addEventListener("touchmove", preventScroll, {
            passive: false,
        });

        window.addEventListener("keydown", preventScrollKeys);

        // Play the intro only once per browser session.


        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            setVisible(false);

            window.dispatchEvent(
                new Event("portfolio:splash-complete")
            );

            return;
        }

        const page = document.querySelector<HTMLElement>(".splash-content");

        const ctx = gsap.context(() => {
            const logos = logoRefs.current.filter(
                (logo): logo is HTMLDivElement => logo !== null
            );

            // Prepare the logo sequence and the page beneath the overlay.
            gsap.set(logos, { autoAlpha: 0, scale: 0.85 });
            gsap.set(overlay, {
                yPercent: 0,
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
            });

            if (page) {
                gsap.set(page, { y: 45 });
            }

            const timeline = gsap.timeline({
                delay: 0.15,
                onComplete: () => {
                    window.removeEventListener("wheel", preventScroll);
                    window.removeEventListener("touchmove", preventScroll);
                    window.removeEventListener("keydown", preventScrollKeys);
                    setVisible(false);

                    window.dispatchEvent(
                        new Event("portfolio:splash-complete")
                    );
                },
            });

            logos.forEach((logo, index) => {
                timeline
                    .to(
                        logo,
                        {
                            autoAlpha: 1,
                            scale: 1,
                            duration: 0.12,
                            ease: "power2.out",
                        },
                        index === 0 ? 0 : ">-0.01"
                    )
                    .to(logo, {
                        autoAlpha: 0,
                        scale: 1.04,
                        duration: 0.08,
                        ease: "power1.in",
                    }, "+=0.08");
            });

            // Reveal the page while the rounded black curtain rises.
            timeline.addLabel("reveal");

            if (page) {
                timeline.to(
                    page,
                    {
                        y: 0,
                        duration: 0.62,
                        ease: "power3.out",
                    },
                    "reveal"
                );
            }

            timeline.to(
                overlay,
                {
                    yPercent: -100,
                    borderBottomLeftRadius: "50% 35px",
                    borderBottomRightRadius: "50% 35px",
                    duration: 0.68,
                    ease: "power3.inOut",
                },
                "reveal"
            );
        }, overlay);

        return () => {
            ctx.revert();
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventScrollKeys);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            ref={overlayRef}
            className="portfolio-splash"
            aria-label="Introducing portfolio"
            aria-hidden="true"
        >
            <div className="portfolio-splash__logo-stage">
                {LOGOS.map((logo, index) => (
                    <div
                        key={logo.name}
                        ref={(element) => {
                            logoRefs.current[index] = element;
                        }}
                        className="portfolio-splash__logo"
                    >
                        <img
                            src={logo.src}
                            alt=""
                            width={64}
                            height={64}
                            draggable={false}
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                                const fallback =
                                    event.currentTarget.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = "block";
                            }}
                        />
                        <span className="portfolio-splash__fallback">
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}