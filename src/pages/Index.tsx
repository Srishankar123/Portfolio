import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
