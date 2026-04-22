import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import oswapLogo from "@/assets/oswap-logo.png";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tight">
            <motion.img
              src={oswapLogo}
              alt="OSWAP"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="h-7 w-7 object-contain"
            />
            OSWAP
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <Link href="/wallet" className="hover:text-foreground transition-colors">Wallet</Link>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <Button asChild className="rounded-md font-medium text-sm px-4 md:px-6">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
