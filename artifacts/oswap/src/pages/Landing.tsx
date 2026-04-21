import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Lock, Zap } from "lucide-react";
import oswapLogo from "@/assets/oswap-logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto text-center flex flex-col items-center justify-center min-h-[70vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl"
        >
          Spend Without Limits
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-xl text-muted-foreground max-w-2xl"
        >
          Generate a global payment card from crypto or fiat. The precision of Stripe, built for a borderless economy.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex gap-4"
        >
          <Button size="lg" asChild className="text-base px-8 h-12 rounded-md">
            <Link href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-secondary/30 border-y border-border/40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-lg">
                <Zap className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Instant Virtual Card</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate a Mastercard in seconds. No credit checks, no waiting periods. Start spending immediately on any platform.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-lg">
                <Lock className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Crypto + Fiat Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deposit USDC, ETH, BTC, or traditional fiat. Your balances are unified and instantly available to spend anywhere.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-lg">
                <Globe className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Global Payments</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accepted by millions of merchants worldwide. Pay for SaaS, flights, ads, and subscriptions without friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Three steps to borderless spending</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
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

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
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
