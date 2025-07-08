// This script fetches your public GitHub repositories and outputs them in the format for your portfolio's projects.ts file.
// Usage: node fetch-github-projects.js <your-github-username>

const https = require('https');
const fs = require('fs');

const username = process.argv[2];
if (!username) {
  console.error('Usage: node fetch-github-projects.js <github-username>');
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/repos?per_page=100`;

https
  .get(
    url,
    {
      headers: { 'User-Agent': 'Node.js' },
    },
    (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const repos = JSON.parse(data);
        const projects = repos.map((repo) => ({
          title: repo.name,
          description: repo.description || '',
          tags: [], // You can manually add tags later
          github: repo.html_url,
          // thumbnail: '', // Optionally add a thumbnail or emoji
        }));
        console.log('Copy the following into your projects.ts:');
        console.log(JSON.stringify(projects, null, 2));
      });
    },
  )
  .on('error', (err) => {
    console.error('Error fetching repos:', err);
  });
