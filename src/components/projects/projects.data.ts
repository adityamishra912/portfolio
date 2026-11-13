export interface Project {
    slug: string;
    title: string;
    category: string;
    tags: string[];
    description: string;
    screenshot?: string;
    github?: string;
    live?: string;
    gradient: string;
}

const projects: Project[] = [
    {
        slug: "apexcode",
        title: "ApexCode",
        category: "Full Stack Development & Systems Engineering",
        tags: ["NEXT.JS", "SPRING BOOT", "CODE EXECUTION", "DOCKER"],
        description:
            "An online coding assessment platform featuring problem management, multi-language code execution, automated test cases, and an isolated judging environment.",
        screenshot: "/projects/apexcode.png",
        github: "https://github.com/binarybrain-7/Online-Assessment-Coding-Platform",
        live: "https://prognexus-eight.vercel.app/",
        gradient: "linear-gradient(135deg, #111827 0%, #4338ca 100%)",
    },
    {
        slug: "risknexus",
        title: "RiskNexus",
        category: "Cybersecurity & Artificial Intelligence",
        tags: ["CYBERSECURITY", "MACHINE LEARNING", "RISK QUANTIFICATION", "OPTIMIZATION"],
        description:
            "An AI-powered cyber risk quantification platform that evaluates organizational security risks, estimates potential financial losses, and optimizes cybersecurity investment decisions.",
        screenshot: "/projects/risknexus.png",
        github: "https://github.com/RajMaurya-07/Cyber_Risk_Quantification",
        live: "https://risknexus.vercel.app",
        gradient: "linear-gradient(135deg, #30120c 0%, #c2410c 100%)",
    },
    {
        slug: "tcap",
        title: "TCAP",
        category: "Full Stack Development & Platform Engineering",
        tags: ["NEXT.JS", "TYPESCRIPT", "FIREBASE", "CLOUDINARY"],
        description:
            "A campus ambassador management platform featuring role-based dashboards, student onboarding, referral tracking, task submissions, points management, leaderboards, and notifications.",
        screenshot: "/projects/tcap.png",
        live: "https://trendyoncampus.com",
        gradient: "linear-gradient(135deg, #172554 0%, #2563eb 100%)",
    },
    {
        slug: "guardianai",
        title: "GuardianAI",
        category: "Artificial Intelligence & Intelligent Systems",
        tags: ["AI", "MACHINE LEARNING", "INTELLIGENT AUTOMATION"],
        description:
            "An intelligent AI-powered system designed to assist with monitoring, threat detection, and proactive decision-making.",
        screenshot: "/projects/guardian-ai.png",
        github: "https://github.com/adityamishra912/GuardianAI",
        live: "https://guardian-ai-navy.vercel.app/",
        gradient: "linear-gradient(135deg, #052e2b 0%, #0d9488 100%)",
    },
];