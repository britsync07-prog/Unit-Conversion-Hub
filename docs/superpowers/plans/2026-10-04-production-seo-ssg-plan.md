# Production SEO & SSG Engine Implementation Plan

Implementation plan for pre-rendering static HTML, dynamic JSON-LD structured data, on-page crawler content, and sitemap generation for **Unit-Conversion-Hub**.

## User Review Required

> [!IMPORTANT]
> This plan executes Static Site Generation (SSG) post-build rendering to ensure all category pages and high-volume unit conversion pages are fully populated HTML files on static hosts.

- Target spec: `docs/superpowers/specs/2026-10-04-production-seo-ssg-design.md`

## Proposed Changes

### SEO Components & Structured Data

#### [NEW] `src/components/seo/SEOHead.tsx`
- Meta tags for `<title>`, `<meta name="description">`, `<link rel="canonical">`, OpenGraph (`og:title`, `og:description`, `og:url`, `og:type`), and Twitter cards.

#### [NEW] `src/components/seo/SchemaMarkup.tsx`
- Renders valid JSON-LD `<script type="application/ld+json">` for:
  - `WebApplication`
  - `BreadcrumbList`
  - `FAQPage`
  - `HowTo` (step-by-step conversion instructions)

#### [NEW] `src/components/seo/SEOContentSection.tsx`
- Crawlable on-page SEO block rendering:
  - Dynamic H1/H2 headings
  - Formula explanation & mathematical conversion factor
  - Step-by-step calculation example
  - Pre-computed lookup reference table (e.g. 1 to 100 units)
  - Accordion FAQ section aligned with `FAQPage` schema

---

### Pages Integration

#### `src/pages/CategoryPage.tsx` & `src/pages/ConverterPage.tsx`
- Attach `SEOHead`, `SchemaMarkup`, and `SEOContentSection` with dynamic props calculated from current category and unit pair metadata.

---

### Build & SSG Pre-rendering Pipeline

#### [NEW] `scripts/prerender.ts`
- Node script using `tsx` that imports static route list (home, categories, top ~200 unit pair combinations).
- Hydrates HTML using React SSR server rendering.
- Writes pre-rendered static HTML files to `dist/{route}/index.html`.

#### [NEW] `scripts/generate-sitemap.ts`
- Generates `dist/sitemap.xml` listing all pre-rendered paths with `priority` and `lastmod`.
- Ensures `dist/robots.txt` points to `https://unitconversionhub.com/sitemap.xml`.

#### `package.json`
- Update `build` script: `vite build && tsx scripts/prerender.ts && tsx scripts/generate-sitemap.ts`.

---

## Verification Plan

### Automated Tests & Build Verification
1. Run `npm run build`
2. Verify exit code 0
3. Inspect generated static files in `dist/`:
   - `dist/index.html`
   - `dist/length/index.html`
   - `dist/length/meters-to-feet/index.html`
   - `dist/weight/kg-to-lbs/index.html`
4. Inspect `dist/sitemap.xml` for valid XML syntax and route URLs.
5. Check pre-rendered HTML for `<script type="application/ld+json">` and target H1 headers.
