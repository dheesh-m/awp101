/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slot"
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "i0.wp.com"
      },
      {
        protocol: "https",
        hostname: "cdn.wallpapersafari.com"
      }
    ]
  }
};

export default nextConfig;

