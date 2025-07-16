import { useState, useEffect } from "react";
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
    website: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      // 🎣 Handle prank redirect (Rickroll)
      if (res.status === 403 && data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      if (res.ok) {
        toast({ title: "OTP sent", description: "Check your inbox (and spam)." });
        setOtpSent(true);
        setResendCooldown(60);
      } else {
        toast({ title: "Error", description: data.message || "Could not send OTP", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Server unreachable", variant: "destructive" });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "OTP verified", description: "You may now submit the form." });
        setOtpVerified(true);
      } else {
        toast({ title: "OTP failed", description: data.message || "Invalid or expired OTP", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "OTP verification failed", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      toast({ title: "OTP Required", description: "Please verify OTP before sending.", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Message sent!",
          description:
            "Thanks for reaching out. I’ll reply soon. Check your spam folder if needed.",
        });
        setFormData({ name: "", email: "", subject: "", message: "", website: "", otp: "" });
        setOtpSent(false);
        setOtpVerified(false);
        setResendCooldown(0);
      } else {
        toast({ title: "Failed to send", description: data.message || "Something went wrong", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not send message", variant: "destructive" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <span className="bg-gradient-primary bg-clip-text text-transparent">Let's Work Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-8 animate-slide-in-left">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h3>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="p-4 bg-gradient-card backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <a href={info.link} className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                    <div className="text-primary group-hover:scale-110 transition-transform">{info.icon}</div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 animate-slide-in-right">
            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="website" value={formData.website} onChange={handleChange} style={{ display: "none" }} autoComplete="off" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                {otpSent && !otpVerified && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" name="otp" value={formData.otp} onChange={handleChange} />
                    <div className="flex gap-2">
                      <Button type="button" onClick={handleVerifyOtp}>Verify OTP</Button>
                      <Button type="button" variant="outline" onClick={handleSendOtp} disabled={resendCooldown > 0}>
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"}
                      </Button>
                    </div>
                  </div>
                )}

                {!otpSent && (
                  <div className="space-y-2">
                    <Button type="button" onClick={handleSendOtp}>Send OTP</Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} required />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group">
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
