import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-subtle"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-accent rounded-full opacity-20 animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-12 h-12 bg-primary-glow rounded-full opacity-30 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Hello, I'm
                </span>
                <br />
                <span className="text-foreground">Srishankar Lokanath</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Data Analyst & Business Analyst
              </p>
              <p className="text-lg text-muted-foreground max-w-lg">
                I specialize in Python, SQL, Power BI, Excel, and data-driven decision
                making. I love transforming raw data into actionable insights to solve
                real-world problems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Button variant="hero" className="group" onClick={scrollToProjects}>
                View My Projects
                <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/Srishankar_Lokanath_Data_Analyst_Resume.pdf" download>
                Download Resume
              </a>
            </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
          <a
            href="https://github.com/Srishankar123"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>

        <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
          <a
            href="https://www.linkedin.com/in/srishankar-lokanath-99a5b4252/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>

  <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
    <a href="mailto:srishankarloknath@gmail.com">
      <Mail className="h-5 w-5" />
    </a>
  </Button>
</div>
          </div>

          {/* Profile Image with Glow */}
          <div className="relative animate-slide-in-right">
            <div className="relative w-fit mx-auto">
              <img
                src="https://i.ibb.co/cKD17Tst/wmremove-transformed-removebg-preview.png"
                alt="Srishankar Lokanath - Data Analyst"
                className="w-[300px] rounded-2xl shadow-elegant relative z-10"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-40 blur-xl animate-glow-pulse z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button
          onClick={scrollToProjects}
          aria-label="Scroll to Projects"
          className="p-2"
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
