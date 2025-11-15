"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Sparkles, Menu, X, Ticket, Home, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#trend", label: "Trending", icon: TrendingUp },
  { href: "/#suggestions", label: "Smart Picks", icon: Zap }
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="glass-navbar flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4 shadow-glow"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-wide text-white transition-all duration-300 hover:scale-105"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Film className="h-6 w-6 text-purple-400" />
          </motion.div>
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            TicketLoJao
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm text-white/70 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300",
                  isActive
                    ? "bg-white/10 text-white"
                    : "hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="secondary"
            size="sm"
            className="group relative overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2 h-4 w-4 text-purple-300 transition-transform duration-300 group-hover:rotate-180" />
            Smart Suggest
          </Button>
          <Button
            size="sm"
            className="shadow-glow-blue transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/booking" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Get Tickets
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-navbar mt-3 rounded-2xl border border-white/10 p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Smart Suggest
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-start shadow-glow-blue"
                  asChild
                >
                  <Link href="/booking" className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    Get Tickets
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
