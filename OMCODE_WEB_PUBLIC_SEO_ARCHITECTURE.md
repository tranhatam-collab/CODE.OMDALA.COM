# OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md

code.omdala.com

Bản khóa kiến trúc SEO, sitemap, metadata, internal linking và cấu trúc song ngữ Việt – Anh cho web public

0. SEO LOCK

Primary domain: code.omdala.com
Language structure: /vi/* and /en/*
Default language: Vietnamese
Mandatory secondary language: English
Indexing policy: Public pages indexable, authenticated routes noindex, docs selectively indexable
Canonical strategy: One canonical URL per page per language
Hreflang: Mandatory for all bilingual page pairs
Sitemap: Separate XML sitemaps per language + sitemap index
Robots: Allow public, block /internal/, /api/, /app/, /code/

1. SITEMAP ARCHITECTURE

1.1 Sitemap index
- Location: https://code.omdala.com/sitemap.xml
- Points to language-specific sitemaps
- Auto-regenerated on build/deploy
- Includes lastmod, changefreq, priority

1.2 Language sitemaps
- https://code.omdala.com/sitemap-vi.xml
- https://code.omdala.com/sitemap-en.xml
- Contains all public URLs for each language
- Excludes noindex pages, authenticated routes, and internal tools

1.3 Sitemap content groups
- Core pages: /, /features, /integrations, /providers, /download, /open-source, /security, /blog, /changelog
- Compare pages: /compare/*
- Docs entry: /docs (if hosted under code.omdala.com before redirect to docs.omdala.com/code)
- Blog posts: /blog/*
- Provider detail pages: /providers/*

2. URL STRUCTURE & ROUTING

2.1 Language prefix pattern
- Vietnamese: https://code.omdala.com/vi/
- English: https://code.omdala.com/en/
- Default redirect: Root / redirects to /vi/ or /en/ based on Accept-Language header or browser locale

2.2 Core URL map
- /vi/ and /en/ (homepage)
- /vi/features and /en/features
- /vi/integrations and /en/integrations
- /vi/providers and /en/providers
- /vi/download and /en/download
- /vi/open-source and /en/open-source
- /vi/security and /en/security
- /vi/blog and /en/blog
- /vi/changelog and /en/changelog
- /vi/compare/* and /en/compare/*
- /vi/providers/* and /en/providers/*
- /vi/blog/* and /en/blog/*

2.3 URL naming rules
- Lowercase, hyphen-separated, no trailing slashes
- Vietnamese slugs use unaccented Latin where possible for SEO compatibility
- English slugs follow standard developer-friendly naming

3. CANONICAL & HREFLANG

3.1 Canonical tags
- Every page must have a self-referencing canonical
- Example: /vi/features canonical = https://code.omdala.com/vi/features
- Example: /en/features canonical = https://code.omdala.com/en/features

3.2 Hreflang pairs
- Every bilingual page pair must include reciprocal hreflang tags
- Example for /vi/features:
  - hreflang="vi" -> /vi/features
  - hreflang="en" -> /en/features
  - hreflang="x-default" -> /en/features (or language selector page)
- Implemented in <head> and/or HTTP headers

3.3 x-default handling
- x-default points to language selector or English as fallback
- Used for users with unsupported or ambiguous language preferences

4. METADATA & OPEN GRAPH

4.1 Meta title pattern
- Vietnamese: [Page Name] — OMCODE | [Short descriptor]
- English: [Page Name] — OMCODE | [Short descriptor]
- Max 60 characters, primary keyword first

4.2 Meta description pattern
- Vietnamese: 150–160 characters, action-oriented, includes primary keyword
- English: 150–160 characters, action-oriented, includes primary keyword
- Unique per page, no duplication across languages

4.3 Open Graph tags
- og:title: Matches meta title
- og:description: Matches meta description
- og:url: Full canonical URL
- og:type: website (homepage), article (blog), product (features/providers)
- og:image: 1200x630px, language-specific or neutral branding
- og:locale: vi_VN or en_US
- og:locale:alternate: Alternate language version

4.4 Twitter Card tags
- twitter:card: summary_large_image
- twitter:title: Matches og:title
- twitter:description: Matches og:description
- twitter:image: Matches og:image

5. STRUCTURED DATA (JSON-LD)

5.1 Site-wide schemas
- Organization: name, url, logo, sameAs (GitHub, social)
- WebSite: name, url, potentialAction (SearchAction if search is available)
- BreadcrumbList: For all pages with hierarchical navigation

5.2 Page-specific schemas
- Features: SoftwareApplication or Service
- Providers: Organization or SoftwareApplication
- Compare: ComparisonTable (custom or Article with structured comparison)
- Download: SoftwareApplication with downloadUrl, operatingSystem, version
- Blog: Article or BlogPosting
- Changelog: SoftwareApplication with release notes

5.3 Schema rules
- One primary schema per page
- No conflicting types
- Validated with Google Rich Results Test and Schema.org validator
- Updated when page content changes significantly

6. HOMEPAGE SEO STRUCTURE

6.1 Purpose
- Explain what OMCODE is
- Establish credibility
- Route users to correct next step
- Capture high-intent developer search traffic

6.2 Core sections (SEO-optimized)
- Hero: Primary keyword, value proposition, dual CTAs (Download Mac, Open App)
- What OMCODE is: 2–3 sentence summary with semantic keywords
- Why Mac-first matters: Targets "Mac AI coding tool" intent
- Multi-provider model support: Targets "multi-provider AI coding" queries
- Open-source core: Links to GitHub, builds trust
- Controlled AI workflow: Differentiates from chat-only tools
- Core feature grid: Internal links to /features/* pages
- Product architecture overview: Visual or diagram with alt text
- GitHub and docs links: Authority signals
- Security and privacy principles: Trust-building content
- Download Mac app: Action-oriented block with system requirements
- Final CTA: Reinforces primary conversion goal

6.3 Homepage metadata example (vi)
- Title: OMCODE — AI Coding Workspace cho Mac | Đa Provider, Mã Nguồn Mở
- Description: OMCODE là workspace viết code bằng AI cho developer trên Mac. Hỗ trợ nhiều provider, local-first, kiểm soát lệnh an toàn và workflow repo-aware.

6.4 Homepage metadata example (en)
- Title: OMCODE — AI Coding Workspace for Mac | Multi-Provider, Open Source
- Description: OMCODE is an AI-native coding workspace for Mac developers. Multi-provider support, local-first workflow, controlled commands, and repo-aware AI sessions.

7. FEATURES PAGES SEO STRUCTURE

7.1 Purpose
- Present core product capabilities in structured detail
- Target long-tail developer search queries

7.2 Page list
- /features/repo-aware-sessions
- /features/file-editing-patches
- /features/controlled-commands
- /features/multi-provider-routing
- /features/prompt-registry
- /features/review-flows
- /features/git-workflows
- /features/local-first-workspace

7.3 Feature page template
- H1: Feature name with primary keyword
- Summary: 2–3 sentences explaining the feature
- How it works: Step-by-step or diagram
- Use cases: Real-world scenarios
- Related features: Internal links
- CTA: Download Mac or Read Docs
- Schema: SoftwareApplication or Service

7.4 Internal linking rules
- Each feature page links back to /features
- Each feature page links to 2–3 related features
- Features link to relevant docs pages
- Features link to /download for conversion

8. COMPARE PAGES SEO STRUCTURE

8.1 Purpose
- Support comparison-driven SEO and high-intent evaluation traffic
- Capture "OMCODE vs X" search queries

8.2 Page list
- /compare/omcode-vs-cursor
- /compare/omcode-vs-claude-code
- /compare/omcode-vs-copilot
- /compare/omcode-vs-browser-ai-tools
- /compare/omcode-vs-self-hosted-stacks

8.3 Compare page template
- H1: OMCODE vs [Competitor]
- Quick answer summary: 2–3 sentences
- Comparison table: Key dimensions (pricing, platform, AI providers, local-first, open-source, MCP support)
- When to choose OMCODE: Clear differentiators
- When to choose [Competitor]: Honest assessment
- Migration or transition notes: If applicable
- CTA: Download Mac or Try OMCODE
- Schema: Article with comparison structure

8.4 SEO rules for compare pages
- Neutral, factual tone
- No competitor bashing
- Focus on architectural and workflow differences
- Updated when competitor changes significantly
- Internal links to relevant OMCODE feature pages

9. PROVIDERS PAGES SEO STRUCTURE

9.1 Purpose
- Explain supported AI providers and usage patterns
- Capture "AI provider integration" queries

9.2 Page list
- /providers (index)
- /providers/openai
- /providers/anthropic
- /providers/cloudflare-workers-ai
- /providers/local-models
- /providers/community-adapters

9.3 Provider page template
- H1: [Provider Name] integration with OMCODE
- Overview: What the provider offers
- How OMCODE integrates: Architecture summary
- Setup steps: API key, configuration, routing
- Supported models: List with capabilities
- Pricing notes: High-level cost structure
- Limitations: Known constraints
- CTA: Add provider or Read docs
- Schema: SoftwareApplication or Service

9.4 Provider index structure
- Grid of provider cards
- Filter by type (cloud, local, community)
- Link to individual provider pages
- Link to /features/multi-provider-routing

10. DOWNLOAD MAC PAGE SEO STRUCTURE

10.1 Purpose
- Make Mac app installation obvious and simple
- Capture "download AI coding tool for Mac" intent

10.2 Required blocks
- macOS availability badge
- Direct download link (latest stable)
- System requirements (macOS version, architecture, RAM, disk)
- Release channels (stable, beta, nightly)
- Setup guide (install steps, first-run flow)
- What happens after install (onboarding summary)
- Troubleshooting link
- Changelog link
- Alternative install (Homebrew, if applicable)

10.3 Download page metadata example (vi)
- Title: Tải OMCODE cho Mac — AI Coding Workspace | Cài Đặt Nhanh
- Description: Tải OMCODE cho macOS. Hỗ trợ Apple Silicon và Intel. Cài đặt nhanh, cấu hình provider dễ dàng, bắt đầu viết code với AI ngay.

10.4 Download page metadata example (en)
- Title: Download OMCODE for Mac — AI Coding Workspace | Quick Install
- Description: Download OMCODE for macOS. Supports Apple Silicon and Intel. Quick install, easy provider setup, start coding with AI immediately.

11. DOCS INDEX STRATEGY

11.1 Purpose
- Route users by intent and experience level
- Provide technical source of truth
- Support self-serve onboarding

11.2 Docs URL structure
- https://docs.omdala.com/code/ (primary docs domain)
- If mirrored under code.omdala.com/docs, canonical points to docs.omdala.com/code

11.3 Docs index layout
- Entry paths by user type:
  - I want to install OMCODE
  - I want to use OMCODE on Mac
  - I want to connect AI providers
  - I want to contribute
  - I want to self-host
  - I want to understand the architecture
- Quick start cluster
- Product concepts cluster
- Technical docs cluster
- Open-source cluster
- Self-host cluster

11.4 Docs SEO rules
- Each docs page has unique title and description
- Breadcrumbs with BreadcrumbList schema
- Internal links between related docs
- Noindex for draft or version-specific docs unless stable
- Canonical points to latest stable version

12. INTERNAL LINKING MAP

12.1 Core linking rules
- Homepage links to all primary sections
- Features link to docs and download
- Compare pages link to features and download
- Providers link to setup docs and download
- Download links to docs, changelog, and security
- Blog links to features, providers, and docs
- Changelog links to releases and GitHub

12.2 Link depth rules
- Maximum 3 clicks from homepage to any public page
- Breadcrumbs on all pages except homepage
- Footer contains links to all primary sections

12.3 Anchor text rules
- Descriptive, keyword-relevant anchors
- No generic "click here" or "read more"
- Consistent anchor text for same destination

13. ROBOTS & CRAWL CONTROL

13.1 Robots.txt
- Allow: /vi/, /en/, /features, /compare, /providers, /download, /open-source, /security, /blog, /changelog
- Disallow: /internal/, /api/, /app/, /code/, /admin/, /_next/, /static/
- Sitemap: https://code.omdala.com/sitemap.xml

13.2 Robots meta tags
- Index, follow for all public pages
- Noindex, nofollow for authenticated routes, internal tools, draft pages
- Noindex for search results pages

13.3 Crawl budget optimization
- Clean URL structure
- No redirect chains
- Minimal 404s
- Fast page load times
- Proper sitemap coverage

14. MULTILINGUAL STRATEGY (VI – EN)

14.1 Content parity rules
- Every public page must exist in both languages
- Content parity is mandatory for core pages (home, features, providers, download, security)
- Blog posts may be published in one language first, translated within 7 days

14.2 Language switcher
- Visible in header and footer
- Switches to equivalent page in other language
- Preserves current path structure
- Sets language preference cookie

14.3 Translation workflow
- Source content in Vietnamese
- English translation reviewed by technical writer
- Both versions published simultaneously for core pages
- Translation keys managed in shared i18n package

14.4 SEO implications
- Separate canonical URLs per language
- Hreflang pairs mandatory
- No cross-language content duplication penalties when properly marked
- Language-specific meta tags and OG locales

15. TECHNICAL SEO REQUIREMENTS

15.1 Performance
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Image optimization: WebP/AVIF, lazy loading, responsive sizes
- Font loading: Preload critical fonts, fallback fonts
- Code splitting: Route-level and component-level
- Caching: CDN edge caching via Cloudflare

15.2 Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Alt text for all images

15.3 Mobile optimization
- Responsive design for all breakpoints
- Touch-friendly CTAs and navigation
- Mobile-first indexing compliance
- No intrusive interstitials

16. IMPLEMENTATION ORDER

16.1 Phase 1: Foundation
- URL structure and routing
- Canonical and hreflang implementation
- Robots.txt and meta tags
- Homepage metadata and OG tags
- Sitemap generation

16.2 Phase 2: Templates
- Features page template
- Compare page template
- Providers page template
- Download page template
- Docs index structure

16.3 Phase 3: Structured data
- JSON-LD schemas for all page types
- Validation and testing
- Rich results optimization

16.4 Phase 4: Audit and iteration
- SEO audit with crawling tools
- Core Web Vitals optimization
- Internal linking audit
- Content gap analysis
- Monthly SEO review cadence

17. KPI & MEASUREMENT

17.1 Traffic metrics
- Organic search sessions
- Top landing pages
- Bounce rate by page type
- Average session duration

17.2 Conversion metrics
- Download clicks
- GitHub repo visits
- Docs page views
- App sign-ups (if applicable)

17.3 Technical metrics
- Index coverage
- Crawl errors
- Core Web Vitals scores
- Structured data validation status

18. FINAL LOCK

Tiếng Việt
Kiến trúc SEO cho code.omdala.com phải rõ ràng, nhất quán và sẵn sàng triển khai ngay từ đầu. Mỗi trang phải có mục tiêu SEO cụ thể, metadata tối ưu, canonical và hreflang đúng chuẩn, internal linking chặt chẽ, và cấu trúc song ngữ Việt – Anh hoàn chỉnh. Không được phép có trang public nào thiếu canonical, thiếu hreflang, hoặc trùng lặp nội dung giữa hai ngôn ngữ.

English
The SEO architecture for code.omdala.com must be clear, consistent, and production-ready from day one. Every page must have a specific SEO goal, optimized metadata, correct canonical and hreflang tags, tight internal linking, and a complete Vietnamese–English bilingual structure. No public page may lack canonical tags, hreflang pairs, or have duplicated content across languages.
