import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Products } from "@/components/Products";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HardwareBackground } from "@/components/HardwareBackground";
import { Preloader } from "@/components/Preloader";

const Index = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <>
      <Preloader onLoaded={() => setHasLoaded(true)} />
      <main className="min-h-screen bg-background relative overflow-x-hidden">
        <HardwareBackground />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Products />
        <Skills />
        <Achievements />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
