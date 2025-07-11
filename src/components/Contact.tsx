import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const replyTemplateId = import.meta.env.VITE_EMAILJS_REPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    // First, send email to self
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        // Then send auto-reply
        return emailjs.send(serviceId, replyTemplateId, templateParams, publicKey);
      })
      .then(() => {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out to Srishankar. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "srishankarloknath@gmail.com",
      link: "mailto:srishankarloknath@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+91 79029 04348",
      link: "tel:+917902904348",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Thalassery, India",
      link: "https://www.google.com/maps/place/thalassery",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it.
            Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new opportunities,
                interesting projects, or just having a chat about technology.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="p-4 bg-gradient-card backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <a
                    href={info.link}
                    className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-in-right">
            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={6}
                    className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
