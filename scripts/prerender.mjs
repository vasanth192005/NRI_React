// Build-time prerender: one static HTML file per route, with its own SEO tags.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = path.join(root, 'dist/client');
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);

const { render } = await imp('dist/server/entry-server.js');
const { SITE } = await imp('src/config.js');
const { indexableRoutes } = await imp('src/routes.js');

const template = fs.readFileSync(path.join(clientDir, 'index.html'), 'utf8');

function build(url) {
  const { html, helmet } = render(url);
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script].map((h) => h.toString()).join('\n    ');
  return template
    .replace('<html lang="en">', `<html ${helmet.htmlAttributes.toString()}>`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
}

// Routes -> /index.html, /services/index.html, /services/power-of-attorney/index.html ...
for (const { path: p } of indexableRoutes) {
  const out = path.join(clientDir, p === '/' ? '' : p, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, build(p));
}
// 404 page (served by Apache ErrorDocument, marked noindex)
fs.writeFileSync(path.join(clientDir, '404.html'), build('/this-page-does-not-exist/'));

// robots.txt + sitemap.xml
fs.writeFileSync(
  path.join(clientDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`
);
const today = new Date().toISOString().slice(0, 10);
const urls = indexableRoutes
  .map(
    (r) => `  <url>\n    <loc>${SITE.url}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  )
  .join('\n');
fs.writeFileSync(
  path.join(clientDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

// PHP contact endpoint + .htaccess ship with the build
fs.cpSync(path.join(root, 'api'), path.join(clientDir, 'api'), { recursive: true });
fs.copyFileSync(path.join(root, 'public-htaccess'), path.join(clientDir, '.htaccess'));

console.log(`Prerendered ${indexableRoutes.length} pages + 404.html`);
