import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "TicketLoJao | Futuristic Movie Booking",
  description:
    "Book cinematic experiences with a neon-dark interface, interactive seats, and a smart timing suggestion engine."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={cn("relative bg-[#04010d] text-foreground", spaceGrotesk.variable)}>
        <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-glow bg-[size:120px_120px] opacity-40" />
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-10">
            <Navbar />
            <main className="flex-1 py-8">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

