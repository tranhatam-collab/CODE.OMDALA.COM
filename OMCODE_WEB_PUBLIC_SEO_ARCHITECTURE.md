# OMCODE Web Public SEO Architecture

This document defines the SEO strategy and implementation plan for the public-facing surfaces under code.omdala.com, including multilingual support, sitemap generation, metadata, and deployment considerations.

## 1. Goals
- Achieve high organic visibility for marketing, docs, and lead generation pages.
- Maintain clean bilingual indexing (Vietnamese and English) with consistent user experience.
- Align SEO with the monorepo build pipelines to guarantee reproducible deployments.
- Optimize crawl efficiency with clean URL structures, sitemaps, and robots policies.

## 2. Scope
- Public site: marketing, product pages, docs hub (code.omdala.com).
- Docs site: docs.omdala.com/code with proper schema and search.
- App routes are authenticated and should not be indexed; apply robots rules accordingly.
- Multilingual support for Vietnamese (vi) and English (en).

## 3. URL & Routing Map
- Public: https://code.omdala.com/
- Docs: https://docs.omdala.com/code/
- App: https://app.omdala.com/code/
- Mac app: https://code.omdala.com/mac/
- Language prefixes example: /vi/..., /en/...

Routing decisions:
- Indexable pages include marketing, docs, blog posts, and public resources.
- Protected content must not be indexed (401/403) and should be blocked by robots rules.

## 4. Metadata Strategy
- Global defaults with per-page overrides:
  - Title template: "%s | OMCODE" (e.g., "Docs – Quick Start | OMCODE").
  - Meta description: 150–160 chars and unique per page.
- Robots: index, follow for public pages; noindex, nofollow for gated content.
- Canonical URLs per language and per page.
- hreflang annotations for vi and en variants.

## 5. Open Graph, Twitter, and Social Metadata
- Open Graph: title, description, image, url, type.
- Twitter Card: summary_large_image using the same image as OG.
- Social imagery should meet recommended dimensions (OG 1200x630, Twitter 1200x628).

## 6. Structured Data (Schema.org)
- Organization: name, url, logo, contactPoint, sameAs.
- Website: potentialAction with siteSearch.
- WebPage: name, description, inLanguage, mainContentOfPage.
- BreadcrumbList for docs and blog navigation.
- Article for blog posts; FAQPage where applicable.

## 7. Internationalization (i18n)
- Languages: vi, en.
- URL strategy: language subpaths under surfaces (e.g., /vi/docs/..., /en/docs/...).
- hreflang tags across language variants.
- Content translation workflow ensures parity with source language.

## 8. Sitemaps and Indexing
- Per-language sitemaps: /sitemap.xml, /vi/sitemap.xml, /en/sitemap.xml.
- Only indexable pages are included; gated content excluded.
- Automate sitemap generation as part of CI/CD (turbo/Next.js build hooks).
- Robots.txt at root defines crawl rules for public vs gated content.

## 9. Performance and Accessibility Considerations
- Prefetch/prefetching for critical pages; valid canonical and alternate links.
- Semantic HTML and accessible metadata support for screen readers and search engines.

## 10. Deployment & Caching Considerations
- Edge caching rules via Cloudflare; cacheDay/time-to-live tuned per surface.
- Sitemap and robots.txt served with proper caching; refresh after content changes.

## 11. Validation & Monitoring
- Use Google Search Console, Bing Webmaster Tools, and schema validators to verify metadata and structured data.
- Regularly audit crawl stats, index coverage, and performance metrics.
- Automated tests for presence of canonical tags, hreflang, and basic structured data on key pages.

## 12. Ownership & Next Steps
- Owner: [Your Name / Team]
- Next steps:
- Integrate Next.js SEO helper (e.g., next-seo) and standardize per-page SEO config.
- Add CI job to verify sitemap generation and metadata on PRs.

## 13. Appendix: Next.js SEO Config Example
```typescript
// next-seo.config.ts
export const SEO = {
  titleTemplate: "%s | OMCODE",
  defaultTitle: "OMCODE | Modern Agentic Framework",
  description: "OMCODE: The frontier agentic, coding, and professional workflow framework.",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://code.omdala.com/',
    siteName: 'OMCODE',
  },
};
```
## 14. Appendix: Sitemap Generation Example (next-sitemap)
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://code.omdala.com',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: 'https://code.omdala.com/vi', hreflang: 'vi' },
    { href: 'https://code.omdala.com/en', hreflang: 'en' },
  ],
}
```

Notes: This document should evolve with surface additions (marketing, docs, app) and domain strategy changes (e.g., new domains, Cloudflare routing).
