
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <About />


      {/* Add the remaining sections here */}
      <section id="work" className="placeholder-section">
        <span>01 / SELECTED WORK</span>
        <h2>Things I&apos;ve built.</h2>
      </section>

      <section id="about" className="placeholder-section">
        <span>02 / ABOUT</span>
        <h2>A little about me.</h2>
      </section>

      <section id="contact" className="placeholder-section">
        <span>03 / CONTACT</span>
        <h2>Let&apos;s make something.</h2>
      </section>
    </main>
  );
}
