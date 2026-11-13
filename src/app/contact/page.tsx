"use client";

import { useState } from "react";

const EMAIL = "aditya.mishra0989@gmail.com";

export default function ContactPage() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [hovered, setHovered] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const params = new URLSearchParams({
            view: "cm",
            fs: "1",
            to: EMAIL,
            su: subject,
            body: message,
        });

        window.location.href =
            `https://mail.google.com/mail/?${params.toString()}`;
    };

    return (
        <section className="relative min-h-screen w-full bg-white px-6 py-24 text-[#171717] sm:px-10">

            <div className="flex flex-col justify-start items-start lg:grid lg:grid-rows-1 lg:grid-cols-2 w-100vw">

                <div className="mx-auto flex lg:min-h-[75vh] w-full max-w-[1200px] flex-col justify-start items-center">

                    {/* Heading */}
                    <div className="mb-12">
                        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                            HAVE A PROJECT IN MIND?
                        </p>

                        <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.075em]">
                            Let&apos;s talk<span className="text-[#4f46e5]">.</span>
                        </h1>

                        <p className="mt-7 max-w-md text-sm leading-7 text-neutral-500 sm:text-base">
                            Have an idea, opportunity, or just want to connect?
                            Drop me a message. I&apos;d love to hear from you.
                        </p>
                    </div>

                </div>

                {/* Contact Form */}
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-2xl"
                    >

                        {/* Subject */}
                        <div className="mb-10">
                            <label
                                htmlFor="subject"
                                className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-black/50"
                            >
                                Subject
                            </label>

                            <input
                                id="subject"
                                type="text"
                                required
                                value={subject}
                                onChange={(event) =>
                                    setSubject(event.target.value)
                                }
                                placeholder="What's this about?"
                                className="w-full border-b border-black/20 bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-neutral-300 focus:border-black sm:text-xl"
                            />
                        </div>

                        {/* Message */}
                        <div className="mb-12">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-black/50"
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                placeholder="Tell me a little about it..."
                                className="w-full resize-y border-b border-black/20 bg-transparent py-4 text-base leading-7 outline-none transition-colors placeholder:text-neutral-300 focus:border-black"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-start">
                            {/* Cursor-following wrapper */}
                            <div
                                className="relative"
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
                                    if (
                                        window.matchMedia("(max-width: 767px)").matches ||
                                        window.matchMedia("(prefers-reduced-motion: reduce)").matches
                                    ) {
                                        return;
                                    }

                                    const rect =
                                        event.currentTarget.getBoundingClientRect();

                                    const x =
                                        (event.clientX - rect.left) / rect.width - 0.5;

                                    const y =
                                        (event.clientY - rect.top) / rect.height - 0.5;

                                    setCursor({
                                        x: x * 8,
                                        y: y * 8,
                                    });
                                }}
                            >
                                <button
                                    type="submit"
                                    disabled={!subject.trim() || !message.trim()}
                                    className="group relative flex h-24 w-60 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#171717] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {/* Blue hover background */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-0 rounded-full bg-[#4f46e5] ${hovered
                                            ? "nav-circle-enter"
                                            : "nav-circle-hidden"
                                            }`}
                                    />

                                    {/* Button text follows cursor */}
                                    <span
                                        className="relative z-10 text-xl font-semibold tracking-tight text-white"
                                        style={{
                                            transform: `translate(${cursor.x * 1.8}px, ${cursor.y * 1.8}px)`,
                                            transition: hovered
                                                ? "transform 60ms ease-out"
                                                : "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                                        }}
                                    >
                                        Send Message ↗
                                    </span>
                                </button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>

            {/* Email address */}
            <div className="mt-10 border-t border-black/10 pt-6 w-[80%] relative left-1/2 -translate-x-1/2">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                    OR REACH ME DIRECTLY
                </p>

                <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
                    className="text-sm transition-colors hover:text-[#4f46e5] sm:text-base"
                >
                    {EMAIL} ↗
                </a>
            </div>

        </section>
    );
}