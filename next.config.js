/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // <-- This is the crucial part for GitHub Pages
  images: {
    unoptimized: true // <-- Required for static export with next/image
  }
};

module.exports = nextConfig;