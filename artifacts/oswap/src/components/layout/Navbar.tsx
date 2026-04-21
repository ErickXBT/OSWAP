import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import oswapLogo from "@/assets/oswap-logo.png";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <img src={oswapLogo} alt="OSWAP" className="h-7 w-7 object-contain" />
            OSWAP
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <Link href="/wallet" className="hover:text-foreground transition-colors">Wallet</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Sign In
          </Link>
          <Button asChild className="rounded-md font-medium text-sm px-6">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
