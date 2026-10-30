# Cozy King 2.1 — Manufacturer Edition

A React/Vite + Node/Express rebuild of Cozy King Manufacturing, designed to stay on Hostinger while presenting Cozy King first and foremost as an upholstered furniture manufacturer for dealers, hospitality, resorts, vacation rentals and multi-unit projects.

## Stack

- React + Vite
- React Router
- Framer Motion
- Node.js + Express
- Hostinger MySQL via `mysql2`
- JWT dealer sessions stored in secure HTTP-only cookies
- Existing Cozy King `users` and `dealer_logins` tables are reused

## Run locally

1. Install Node.js 20+ if needed.
2. Open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:5173`.

The public website works without MySQL. Dealer login, dealer order submission and saved contract inquiries require database settings in `.env`.

## Connect the Hostinger MySQL database

Copy `.env.example` to `.env` and add the database values from hPanel.

```env
PORT=8787
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=use-a-long-random-secret
DB_HOST=...
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
ADMIN_EMAILS=...
```

Then run `database/001_cozy_king_2.sql` in phpMyAdmin. It adds the new inquiry/order tables but intentionally leaves the existing `users` and `dealer_logins` tables alone.

## Production build

```bash
npm run build
npm start
```

In production, Express serves the Vite build from `/dist` and exposes the API from the same application.

## Hostinger deployment notes

Use a Hostinger plan with Node.js Web App support. Point the app at this project, set the environment variables in hPanel, use `npm run build` as the build command and `npm start` as the start command. The exact hPanel fields can vary by plan, so confirm the current Node.js deployment screen before the final production switch.

## What was migrated

- New responsive public website and design system
- Home, Products, collection pages and data-driven product pages
- Sleeper mechanism comparison page
- Contract/commercial landing page + inquiry API
- Projects and company story pages
- New dealer login API using the existing dealer user table
- New React dealer order builder + MySQL order tables
- Existing product imagery, display imagery, video and fabric/pricing data

## Not copied from the legacy upload

Historical generated order documents, Composer/PHP dependencies, the nested backup ZIP, legacy PHP source files and old production credentials are intentionally excluded from this new project. Keep the old site backed up until the new Node version has been validated in production.

## 2.1 manufacturer-first update

- Rebuilt the homepage hero around direct manufacturing rather than consumer lifestyle/ecommerce language.
- Expanded the Cozy King red, white and navy palette across navigation, calls to action, supporting pages and footer.
- Moved featured products near the top of the homepage and framed them as manufacturer products/specifications rather than items for online purchase.
- Added dedicated audience messaging for dealers/retailers, hotels/resorts, vacation rentals/condos and design/procurement teams.
- Added stronger Mississippi manufacturing proof points and a capabilities section.
- Reframed the sleeper-system, manufacturing video and contract CTA sections for B2B decision makers.
- Updated Products and navigation language to reinforce the manufacturer/product-line model.

## 2.6 — Homepage final polish

The homepage now uses one consistent wide content axis from hero through the final CTA, with refined desktop/tablet/mobile spacing, smoother navigation transitions, touch-safe hover behavior, a swipeable partner rail on mobile, improved focus states, and reduced-motion support. The lower-page manufacturing video is lazy-activated near the viewport to avoid downloading the large MP4 during initial page load, and the hero image is explicitly preloaded for faster first paint.

## 2.7 Product Family Page Refresh

The collection pages for Sleeper Sofas, Kenzie Sectionals, Loveseats and HAZ Chairs now share the finalized Cozy King manufacturer-catalog layout: staged hero, specification-forward product cards, category-specific benefits, responsive grids and reduced-motion/touch-safe interaction states.


## 2.16 — Remaining-page modernization

This pass brings the pages outside the finalized Home, Product Line/collection and individual Product Detail systems up to the same visual and responsive standard.

- Rebuilt **Hospitality & Contract** as the primary B2B project-conversion page with audience cards, direct-manufacturer capabilities, a three-step specification process and a redesigned inquiry form.
- Rebuilt **Applications** around hospitality, vacation rentals, multi-unit work and dealer/design relationships with image-led property cards and manufacturer support messaging.
- Reworked **Sleeper Systems** into a specification-oriented guide for Cozy Sleep, Classic Square and SBA with larger mechanism presentations and use-case guidance.
- Refined **Our Story** around Marine veteran founder Ken King, family ownership, Emerald Coast experience and American manufacturing in Tremont, Mississippi.
- Rebuilt the **Dealer Portal** login presentation and dealer order-builder UI while preserving the existing API/database workflow.
- Added an on-brand responsive **404** state.
- Added dedicated tablet/mobile layouts, touch-safe interactions and reduced-motion support for the new page systems.

The finalized Home, Product/Collection and individual Product Detail page structures were intentionally left unchanged in this pass.
