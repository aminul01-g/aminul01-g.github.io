/** @type {import('next').NextConfig} */

const repo = 'Aminul.github.io'; // This should be your repository name
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

module.exports = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};