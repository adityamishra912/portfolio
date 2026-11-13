export default function ResumePage() {
    const resumePath = "/resume/Resume.pdf";

    return (
        <main className="min-h-screen bg-white text-black px-6 py-8 md:px-16">

            <section className="max-w-6xl mx-auto mt-16">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <p className="text-xs tracking-widest text-gray-500">
                            CURRICULUM VITAE
                        </p>
                        <h1 className="text-5xl mt-2">
                            Resume.
                        </h1>
                    </div>

                    <a
                        href={resumePath}
                        download
                        className="border border-black px-5 py-3 text-sm hover:bg-black hover:text-white transition"
                    >
                        Download PDF ↗
                    </a>
                </div>

                <iframe
                    src={resumePath}
                    className="w-full h-[85vh] border"
                    title="Aditya Mishra Resume"
                />

            </section>
        </main>
    );
}