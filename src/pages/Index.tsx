import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Products } from "@/components/Products";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HardwareBackground } from "@/components/HardwareBackground";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative">
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
  );
};

export default Index;
