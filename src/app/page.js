"use client";

import About from "@/component/Home/AboutSection";
import Contact from "@/component/Home/Contact";
import Experience from "@/component/Home/Experience";
import HeroSection from "@/component/Home/HeroSection";
import Projects from "@/component/Home/Projects";
import SkillsPage from "@/component/Home/Skills";
import Preloader from "@/component/Preloader";
import { useCallback, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderFinish = useCallback(() => {
    // console.log("🎯 Preloader finished!");
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader onFinish={handlePreloaderFinish} />
      ) : (
        <div className="bg-transparent transition-colors duration-300 min-h-screen">
          <section id="home" className="scroll-mt-15" loading="lazy">
            <HeroSection />
          </section>
          
          <section id="about" className="scroll-mt-15" loading="lazy">
            <About />
          </section>

          <section id="experience" className="scroll-mt-15" loading="lazy">
            <Experience />
          </section>

          <section id="skills" className="scroll-mt-15" loading="lazy">
            <SkillsPage />
          </section>
          
          <section id="projects" className="scroll-mt-15" loading="lazy">
            <Projects />
          </section>

          <section id="contacts" className="scroll-mt-15" loading="lazy">
            <Contact />
          </section>
        </div>
      )}
    </>
  );
}
