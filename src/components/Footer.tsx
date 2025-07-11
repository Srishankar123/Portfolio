import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Srishankar Lokanath
            </h3>
            <p className="text-muted-foreground">
              Data Analyst & Business Analyst passionate about turning data into impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                asChild
              >
                <a href="https://github.com/Srishankar123" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                asChild
              >
                <a href="https://www.linkedin.com/in/srishankar-lokanath-99a5b4252/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                asChild
              >
                <a href="mailto:srishankarloknath@gmail.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Srishankar Lokanath. Made with
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            and a love for clean data.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
