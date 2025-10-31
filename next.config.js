/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 enables static export (creates "out" folder)
  images: {
    unoptimized: true, // required for export (no Next.js image optimizer)
  },
  experimental: {
    // appDir: true, // can stay commented if already using App Router
  },
};

module.exports = nextConfig;
