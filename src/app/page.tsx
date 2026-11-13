import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/Skills";
import { SkipBack } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <About />
      <Projects />
      <Skills />

    </main>
  );
}
