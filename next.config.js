/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // This should be the name of your repository
  const repo = 'Aminul.github.io';
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

module.exports = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};