# Bayu — Creative Marketing & Digital Systems Builder

Personal portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
npm run start
```

## 2. Project structure

```
app/                 Routes (home page, /projects/[slug] case studies, sitemap, robots)
sections/            One component per homepage section (Hero, About, Experience, ...)
components/          Reusable UI (Navbar, Footer, Button, VideoModal, BrowserMockup, ...)
data/                All editable content: experience.ts, videos.ts, projects.ts, skills.ts
config/              site.ts (nav/metadata) and contact.ts (WhatsApp/email/socials)
types/                Shared TypeScript types
public/images/       Placeholder images (SVG) — replace with your own photos/screenshots
```

Content lives in `data/` and `config/`, not scattered across components — edit those files and the whole site updates.

## 3. Replace the placeholder photos

All current images in `public/images/` are neat placeholder SVGs (not random stock photos) so the site runs out of the box. Replace them with real files of the same name, or update the path in the matching data file:

- **Hero portrait**: `public/images/portrait-placeholder.svg` → used in `sections/Hero.tsx`
- **About photo**: `public/images/about-candid.svg` → used in `sections/About.tsx`
- **Video thumbnails**: `public/images/videos/placeholder-16x9-XX.svg` → path set per video in `data/videos.ts` (`thumbnail` field)
- **Digital system screenshots**: `public/images/projects/*.svg` → path set per project in `data/projects.ts` (`heroImage`, `desktopScreenshot`, `mobileScreenshot`)
- **Open Graph social preview**: `public/images/og-cover.svg` → referenced in `config/site.ts` (`ogImage`). Replace with a real 1200×630 JPG/PNG before launch — most social platforms don't render SVG previews.
- **Resume**: add your PDF at `public/bayu-resume.pdf` (referenced by `resumeUrl` in `config/site.ts`).
- **Favicon**: edit `app/icon.svg`, or replace it with a PNG/ICO named `icon.png` / `favicon.ico` in `app/` (Next.js picks it up automatically).

Recommended sizes: portrait/about photos ~900×1100px, video thumbnails 1280×720px, desktop screenshots 1440×900px, mobile screenshots 375×812px.

## 4. Replace YouTube video IDs

Open `data/videos.ts`. Each entry has a `youtubeId` field — this must be the ID of an **Unlisted** YouTube video (the part after `v=` in a YouTube URL, e.g. `https://www.youtube.com/watch?v=abcXYZ123` → `abcXYZ123`).

Videos are lazy-loaded: only the thumbnail renders until the person clicks play, at which point the YouTube iframe loads inside an accessible modal (closable via the close button, the Escape key, or a click on the overlay).

To add a new video, copy an existing object in the `videos` array and fill in `title`, `category` (must be one of `Campaign`, `Commercial`, `Social Media`, `Event`, `Educational`), `thumbnail`, `youtubeId`, `role`, `year`, `platform`, and optional `metric`.

## 5. Add a new Digital System project

Open `data/projects.ts` and copy one object in the `digitalSystems` array. Key fields:

- `slug` — becomes the URL, e.g. `slug: "my-project"` → `/projects/my-project`
- `allowEmbed` — if `true` and `liveUrl` is set, "Live Preview" opens the site in an in-page browser-mockup modal via iframe. If `false`, "Live Preview" opens `liveUrl` in a new tab instead (and if `liveUrl` is `null`, the button shows a disabled state with a short explanation).
- `caseStudyUrl` — should match `/projects/${slug}` — this is what the "View Case Study" button links to.

The case study page at `app/projects/[slug]/page.tsx` is generated automatically for every entry in `digitalSystems` — no need to create a new page file.

## 6. Update contact links

Everything contact-related lives in **one file**: `config/contact.ts`.

```ts
whatsappNumber: "6281234567890", // international format, no + no spaces
email: "hello@bayu.id",
linkedin: "...",
instagram: "...",
youtube: "...",
```

## 7. Update navigation, site title, and SEO basics

`config/site.ts` controls the nav links, page title/description, Open Graph data, and the resume file path. Update `url` to your real production domain before deploying — it's used for the canonical URL, Open Graph tags, and the generated sitemap (`app/sitemap.ts`) and robots file (`app/robots.ts`).

## 8. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset should auto-detect as **Next.js** — no extra configuration needed.
4. Click **Deploy**.
5. Once live, update `url` in `config/site.ts` to your Vercel (or custom) domain and redeploy so metadata and the sitemap point to the right place.

No environment variables or backend/database are required — this is a static content site with no server-side data fetching.

## 9. Accessibility & performance notes

- All interactive icon-only buttons have `aria-label`s; modals trap focus on open and restore it on close.
- Animations respect `prefers-reduced-motion`.
- Images use `next/image` with lazy loading (except the hero portrait, which is preloaded since it's above the fold).
- YouTube iframes and the live-preview iframe never load until the user explicitly opens them.
