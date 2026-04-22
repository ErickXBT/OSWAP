import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { SliceSection } from "@/components/SliceSection";
import { PrecisionSection } from "@/components/PrecisionSection";
import { HeroSphereSection } from "@/components/HeroSphereSection";
import { VortexSection } from "@/components/VortexSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Lock, Zap } from "lucide-react";
import oswapLogo from "@/assets/oswap-logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-6 max-w-[1200px] mx-auto md:min-h-[80vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div className="flex flex-col items-start text-left order-2 md:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-['Poppins'] font-bold text-[2.5rem] sm:text-[3.6rem] md:text-[5.4rem] tracking-tight text-foreground leading-[1.05]"
              style={{ fontWeight: 700 }}
            >
              <span className="block">Spend</span>
              <span className="block">Without</span>
              <span className="block">Limits</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 md:mt-6 text-base md:text-xl text-muted-foreground max-w-md"
            >
              Generate a global payment card from crypto or fiat. The precision of Stripe, built for a borderless economy.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 md:mt-10 flex gap-4"
            >
              <Button size="lg" asChild className="text-base px-8 h-12 rounded-md">
                <Link href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center md:justify-end order-1 md:order-2"
          >
            <motion.img
              src={oswapLogo}
              alt="OSWAP"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="w-2/3 sm:w-1/2 md:w-full max-w-[43.2rem] aspect-square object-contain"
            />
          </motion.div>
        </div>
      </section>

      <VortexSection />

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary/30 border-y border-border/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { Icon: Zap, title: "Instant Virtual Card", desc: "Generate a Mastercard in seconds. No credit checks, no waiting periods. Start spending immediately on any platform." },
              { Icon: Lock, title: "Crypto + Fiat Support", desc: "Deposit USDC, ETH, BTC, or traditional fiat. Your balances are unified and instantly available to spend anywhere." },
              { Icon: Globe, title: "Global Payments", desc: "Accepted by millions of merchants worldwide. Pay for SaaS, flights, ads, and subscriptions without friction." },
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="group relative flex flex-col gap-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-white/5 to-transparent opacity-60" />
                <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="relative w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-xl shadow-inner">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="relative text-xl font-semibold">{title}</h3>
                <p className="relative text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroSphereSection />

      <PrecisionSection />

      {/* How it Works */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-16">Three steps to borderless spending</h2>
          
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-border z-0"></div>
            
            {[
              { num: "01", title: "Deposit Funds", desc: "Send crypto to your unique address or wire fiat via ACH/SEPA." },
              { num: "02", title: "Generate Card", desc: "Click a button to issue your virtual Mastercard instantly." },
              { num: "03", title: "Spend Anywhere", desc: "Use your card details to pay for anything, anywhere online." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center bg-background px-4">
                <div className="w-16 h-16 bg-background border border-border rounded-full flex items-center justify-center text-xl font-bold mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SliceSection />

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground text-center md:text-left">
          <div className="flex items-center gap-2 font-bold text-foreground text-xl tracking-tight">
            <img src={oswapLogo} alt="OSWAP" className="h-7 w-7 object-contain" />
            OSWAP
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
          <div>© {new Date().getFullYear()} Oswap Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
