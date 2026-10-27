export interface Project {
    slug: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    screenshot?: string;
    github: string;
    live?: string;
    gradient: string;
}

export const projects: Project[] = [
    {
        slug: "marketpulse",
        title: "MarketPulse",
        category: "Data Engineering & Development",
        tags: ["DATA ENGINEERING", "ANALYTICS"],
        description:
            "A market intelligence platform for turning raw data into actionable insights.",
        screenshot: "/projects/marketpulse.png",
        github: "https://github.com/your-username/marketpulse",
        live: "",
        gradient: "linear-gradient(135deg, #07152f, #2459dc)",
    },
    {
        slug: "plantix",
        title: "Plantix",
        category: "Deep Learning & Computer Vision",
        tags: ["DEEP LEARNING", "COMPUTER VISION"],
        description:
            "An intelligent plant analysis system powered by computer vision.",
        screenshot: "/projects/plantix.png",
        github: "https://github.com/your-username/plantix",
        live: "",
        gradient: "linear-gradient(135deg, #003b27, #16844b)",
    },
    {
        slug: "intellicast",
        title: "IntelliCast",
        category: "NLP, LLM & RAG",
        tags: ["NLP", "LLM", "RAG"],
        description:
            "An AI-powered application built around language models and retrieval.",
        github: "https://github.com/your-username/intellicast",
        live: "",
        gradient: "linear-gradient(135deg, #21103f, #763bd5)",
    },
];