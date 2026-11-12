# Bharath NRI Property — React + SEO

## Setup
1. Edit `src/config.js` — site URL, WhatsApp number, email, community link, meta description.
2. Edit `api/config.php` — enquiry email, From address, allowed hosts.
3. `npm install`
4. `npm run dev` (local) or `npm run build` (production).

## Deploy (cPanel / public_html)
Upload the **contents** of `dist/client/` to `public_html/` (includes `.htaccess`, `api/`, `robots.txt`, `sitemap.xml`).
Delete the old PHP files (`index.php`, `submit.php`, `inc/`, `config.php`, old `.htaccess`).

## Pages (each is a real prerendered URL with its own title, description, canonical, OG and JSON-LD)
- `/`  Home
- `/services/` + 6 service pages in `/services/<slug>/` (content: `src/data/services.js`)
- `/locations/bangalore/`, `/locations/chennai/`
- `/why-us/`, `/process/`, `/faq/`, `/contact/`
- `404.html` (noindex)

Add a new service or city by adding an entry to `src/data/services.js`; it is routed, prerendered and added to the sitemap automatically.

## SEO included
- One prerendered HTML file per page (crawlers see full content without running JS)
- Unique title/description/canonical per page, BreadcrumbList, Service and FAQPage schema
- Title, meta description, keywords, canonical, robots
- Open Graph + Twitter cards
- JSON-LD: LegalService, WebSite, FAQPage
- robots.txt + sitemap.xml generated from `SITE.url`
- Semantic headings, alt text, lang="en"

## Notes
- Contact form posts JSON to `/api/contact.php` (honeypot, origin check, 30s rate limit, PHP `mail()`).
- Add a 1200x630 `public/assets/img/og-image.jpg` and set `SITE.ogImage` for better social previews.
