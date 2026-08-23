import { useState } from "react";
import { Mail, Phone, MapPin, Download, Send, MessageSquareCode } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const channels = [
  { icon: Mail, label: "Email", val: "jagadish2k2006@gmail.com", href: "mailto:jagadish2k2006@gmail.com" },
  { icon: MessageSquareCode, label: "WhatsApp", val: "+91 80150 24729", href: "https://wa.me/918015024729?text=Hi%20Jagadish" },
  { icon: Phone, label: "Phone", val: "+91 80150 24729", href: "tel:+918015024729" },
  { icon: MapPin, label: "Location", val: "Chennai, Tamil Nadu, India", href: "#" },
];

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "Message Dispatched! 🚀",
        description: `Thank you ${formData.name}. I will reply shortly.`,
      });
      setFormData({ name: "", email: "", message: "" });
    }, 700);
  };

  return (
    <section id="contact" className="py-20 relative bg-[#08080a] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-neutral-400 font-tech text-xs font-bold uppercase tracking-widest block mb-1">
            INITIATE COLLABORATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            GET IN TOUCH
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Quick Channels */}
          <div className="md:col-span-5 space-y-3">
            {channels.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#121216] border border-white/10 hover:border-white/40 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ch.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 font-tech uppercase block">
                    {ch.label}
                  </span>
                  <span className="text-xs font-semibold text-white font-tech group-hover:text-neutral-200 transition-colors">
                    {ch.val}
                  </span>
                </div>
              </a>
            ))}

            <Button
              className="w-full rounded-xl h-12 bg-white hover:bg-neutral-200 text-black font-tech font-bold text-xs uppercase tracking-wider mt-4 transition-all hover:scale-[1.02]"
              asChild
            >
              <a
                href="/Jagadish_K_Resume_2026.pdf"
                download="Jagadish_K_Resume_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </a>
            </Button>
          </div>

          {/* Compact Form */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-[#121216] border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/50 border-white/10 text-white rounded-xl h-11 text-xs"
                  required
                />
              </div>

              <Textarea
                placeholder="Your message or project details..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-black/50 border-white/10 text-white rounded-xl text-xs resize-none p-3.5"
                required
              />

              <Button
                type="submit"
                disabled={isSending}
                className="w-full rounded-xl h-11 bg-white/10 hover:bg-white hover:text-black text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? "Dispatching..." : "Send Message"}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
