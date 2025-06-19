/** @type {import('next').NextConfig} */
const nextConfig = {
  // The output mode must be 'export' for static sites.
  output: 'export',

  // This is important for Next.js 13+ and static exports.
  // It ensures that images are handled correctly without a server.
  images: {
    unoptimized: true,
  },

  // This tells Next.js not to modify the asset paths, which is
  // crucial for CSS, JS, and image files to be found correctly
  // on GitHub Pages.
  assetPrefix: './',
};

module.exports = nextConfig;