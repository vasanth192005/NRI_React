# Bharath NRI Property — React + SEO

## Setup
1. Edit `src/config.js` — site URL, WhatsApp number, email, community link, meta description.
2. Edit `api/config.php` — enquiry email, From address, allowed hosts.
3. `npm install`
4. `npm run dev` (local) or `npm run build` (production).

## Deploy (cPanel / public_html)
Upload the **contents** of `dist/client/` to `public_html/` (includes `.htaccess`, `api/`, `robots.txt`, `sitemap.xml`).
Delete the old PHP files (`index.php`, `submit.php`, `inc/`, `config.php`, old `.htaccess`).

## SEO included
- Prerendered HTML at build time (crawlers see full content without running JS)
- Title, meta description, keywords, canonical, robots
- Open Graph + Twitter cards
- JSON-LD: LegalService, WebSite, FAQPage
- robots.txt + sitemap.xml generated from `SITE.url`
- Semantic headings, alt text, lang="en"

## Notes
- Contact form posts JSON to `/api/contact.php` (honeypot, origin check, 30s rate limit, PHP `mail()`).
- Add a 1200x630 `public/assets/img/og-image.jpg` and set `SITE.ogImage` for better social previews.
