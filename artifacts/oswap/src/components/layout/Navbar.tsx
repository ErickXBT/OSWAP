import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import oswapLogo from "@/assets/oswap-logo.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about", isAnchor: true },
    { label: "Features", href: "#features", isAnchor: true },
    { label: "How it Works", href: "#how-it-works", isAnchor: true },
    { label: "Wallet", href: "/wallet", isAnchor: false },
  ];

  return (
    <>
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
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button asChild className="rounded-md font-medium text-sm px-4 md:px-6">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden fixed top-16 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg"
          >
            <div className="flex flex-col py-4 px-6 gap-1">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/30 last:border-0 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/30 last:border-0 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
