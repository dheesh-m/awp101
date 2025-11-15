import { Film, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  { name: "Dheesh Medekar F-31", role: "Full Stack Developer" },
  { name: "Anushka Patil F-34", role: "UI/UX Designer" },
  { name: "Renesh Sharma F-45", role: "Backend Engineer" },
  { name: "Nikhil Kurkur F-27", role: "Backend Engineer" }
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" }
];

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-black via-[#0a0a1a] to-[#000428]">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000428] via-transparent to-transparent opacity-60" />
      
      <div className="relative z-10 px-8 py-12 sm:px-12 lg:px-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-purple-400" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                TicketLoJao
              </span>
            </div>
            <p className="text-sm text-white/60">
              Your futuristic movie booking experience. Book tickets with style. .
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="rounded-lg p-2 text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#trend" className="transition-colors hover:text-white">
                  Trending Movies
                </Link>
              </li>
              <li>
                <Link href="/#suggestions" className="transition-colors hover:text-white">
                  Smart Suggestions
                </Link>
              </li>
              <li>
                <Link href="/booking" className="transition-colors hover:text-white">
                  Book Tickets
                </Link>
              </li>
            </ul>
          </div>

          {/* Team Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Our Team</h3>
            <ul className="space-y-3 text-sm">
              {teamMembers.map((member, index) => (
                <li key={index} className="text-white/60">
                  <div className="font-medium text-white">{member.name}</div>
                  <div className="text-xs text-white/50">{member.role}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Built With</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Next.js 14</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} TicketLoJao. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
