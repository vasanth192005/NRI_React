// Build-time prerender: injects server-rendered HTML + SEO tags into dist/client/index.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist/client');
const serverEntry = pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href;

const { render } = await import(serverEntry);
const { SITE } = await import(pathToFileURL(path.join(root, 'src/config.js')).href);
const { html, helmet } = render();

const head = [
  helmet.title.toString(),
  helmet.meta.toString(),
  helmet.link.toString(),
  helmet.script.toString(),
].join('\n    ');

let template = fs.readFileSync(path.join(clientDir, 'index.html'), 'utf8');
template = template
  .replace('<html lang="en">', `<html ${helmet.htmlAttributes.toString()}>`)
  .replace('<!--app-head-->', head)
  .replace('<!--app-html-->', html);
fs.writeFileSync(path.join(clientDir, 'index.html'), template);

// robots.txt + sitemap.xml
fs.writeFileSync(
  path.join(clientDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(clientDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE.url}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`
);

// PHP contact endpoint + .htaccess ship with the build
fs.cpSync(path.join(root, 'api'), path.join(clientDir, 'api'), { recursive: true });
fs.copyFileSync(path.join(root, 'public-htaccess'), path.join(clientDir, '.htaccess'));

console.log('Prerendered ->', path.join(clientDir, 'index.html'));
