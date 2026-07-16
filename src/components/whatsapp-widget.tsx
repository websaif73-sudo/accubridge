import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "923350320720"; // +92 335 0320720

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("Hi AccuBridge — I'd like to discuss a project.");

  const send = () => {
    const text = encodeURIComponent(msg.slice(0, 500));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[320px] rounded-3xl glass-light shadow-luxury overflow-hidden animate-reveal-up">
          <div className="bg-royal-gradient p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">AccuBridge</p>
                <p className="text-sm font-medium">We typically reply within minutes</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="rounded-2xl bg-white/70 p-3 text-sm text-foreground/80 mb-3 border border-border">
              👋 Welcome. Tell us about your brand and we'll craft a proposal today.
            </div>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, 500))}
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-white/80 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={send}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <Send className="h-4 w-4" /> Send on WhatsApp
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat on WhatsApp"
        className={cn(
          "relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-luxury transition-transform hover:scale-110",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <MessageCircle className="relative h-7 w-7" />
      </button>
    </div>
  );
}
