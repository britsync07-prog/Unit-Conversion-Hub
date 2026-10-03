# Production SEO & SSG Engine Design Spec

## Overview
This specification outlines the production SEO architecture and Static Site Generation (SSG) pre-rendering pipeline for **Unit-Conversion-Hub** to outrank competitors like `unitconversionhub.com` in search engine results (Google, Bing).

## Target Goals & Success Criteria
1. **100% Pre-rendered Indexable HTML:** Crawlers receive fully populated HTML with conversion formulas, quick lookup tables, and FAQ content without requiring JavaScript execution.
2. **Rich Snippets & Structured Data:** Full Schema.org JSON-LD integration (`WebApplication`, `BreadcrumbList`, `FAQPage`, `HowTo`) for SERP rich results.
3. **Core Web Vitals & Speed:** 95+ Mobile/Desktop Lighthouse performance score via static pre-rendering.
4. **Automated XML Sitemap:** Auto-generated `public/sitemap.xml` referencing all pre-rendered category and high-volume unit pair pages.

## Architectural Components

### 1. Static Site Generation (SSG) Pipeline (`scripts/prerender.ts`)
- **Execution Point:** Runs post-build (`npm run build` -> `vite build && tsx scripts/prerender.ts`).
- **Route Enumeration:**
  - Homepage: `/`
  - Category Hubs: `/{category}` (e.g. `/length`, `/weight`, `/temperature`, `/volume`, `/area`, `/speed`, `/time`, `/digital-storage`, `/energy`, `/pressure`)
  - Top Unit Pair Converters: `/{category}/{from}-to-{to}` (e.g. `/length/meters-to-feet`, `/weight/kg-to-lbs`, `/temperature/celsius-to-fahrenheit`)
- **HTML Hydration:** Uses React DOM Server (`react-dom/server`) to render routes and output clean nested directories (e.g. `dist/length/meters-to-feet/index.html`).

### 2. SEO & Meta Head Manager (`src/components/seo/SEOHead.tsx`)
- Dynamic `<title>`: e.g. `Convert Meters to Feet (m to ft) – Free Unit Converter`
- Meta Description: Unique target keyword descriptions for every unit pair.
- Canonical URLs: Explicit canonical tag per route (`https://unitconversionhub.com/{path}`).
- OpenGraph & Twitter Cards: Pre-populated tags for social sharing.

### 3. Structured Data Generator (`src/components/seo/SchemaMarkup.tsx`)
Injects inline `<script type="application/ld+json">` containing:
- **WebApplication Schema:** App category, pricing ($0), currency.
- **BreadcrumbList Schema:** `Home > Category > Unit Pair`.
- **FAQPage Schema:** Questions and answers specific to unit pair conversion.
- **HowTo Schema:** Step-by-step conversion procedure.

### 4. On-Page Competitor-Crushing SEO Content Engine (`src/components/seo/SEOContentSection.tsx`)
Every conversion page includes crawler-accessible structured HTML:
- **Hero & Dynamic Title H1/H2 tags**
- **Step-by-Step Conversion Formula & Worked Example**
- **Pre-computed Quick Reference Conversion Table** (e.g., 1, 5, 10, 25, 50, 100 units converted)
- **FAQ Accordion** with schema-aligned content.

### 5. Sitemap & Robots Generator (`scripts/generate-sitemap.ts`)
- Scans target routes and writes compliant `dist/sitemap.xml` with `<lastmod>`, `<changefreq>`, and `<priority>` attributes.
- Configures `robots.txt` pointing directly to the sitemap URL.

## Execution Order
1. Build React client app bundle (`vite build`).
2. Run SSG pre-renderer to produce static HTML files for all target routes into `dist/`.
3. Generate updated `sitemap.xml` and `robots.txt`.
