# AURA ACOUSTICS — Premium Speaker E-Commerce Platform

A production-grade, full-stack speaker and audiophile acoustic hardware e-commerce platform built with **React**, **Node.js with Express**, and an atomic persistent JSON database.

---

## Features

- **Modern Luxury Tech Aesthetic**: Deep obsidian black (`#070A12`), dark navy structural surfaces, electric blue highlights (`#2563EB`, `#38BDF8`), and clean typography (`Space Grotesk` & `Plus Jakarta Sans`).
- **Interactive Audio Visualizer / Frequency Simulator**: Test virtual acoustics across Sub-Bass (24Hz), Vocal Presence (1kHz), and 3D Spatial Atmos with real-time waveform bars.
- **7 Fully Realized Pages**:
  1. **Home Page**: Campaign hero banner with flagship slider, interactive DSP equalizer demo, 4 featured products, acoustic pillars, mastering engineer testimonials, and newsletter signup.
  2. **Products Catalog Page**: Complete catalog of 12 pre-seeded acoustic systems with category tabs (Bluetooth, Home Theatre, Portable, Smart Speaker), real-time search, price range slider ($100 – $3,000), in-stock filters, and sorting.
  3. **Product Detail Page (PDP)**: Contiguous purchase module, multi-angle acoustic perspective selector, detailed engineering specs table, driver analysis, quantity steppers, and related speaker recommendations.
  4. **About Page**: Brand story, acoustic laboratory overview, anechoic chamber standards, and the engineering leadership team.
  5. **Contact Page**: Validated contact form that saves inquiries to the backend database, plus stylized San Francisco audio district map placeholder and direct concierge info.
  6. **Cart Page & Slide-Over Drawer**: Interactive quantity adjustments, promo code engine (`AUDIO10` for 10% off), subtotal, tax calculation, free shipping thresholds, and complete multi-step checkout with order receipt generation.
  7. **Admin Console**: Live inventory management, add new product modal, delete product, manage incoming customer contact inquiries with status toggles (Unread, Read, Replied), and one-click database reset.
- **Zero-Broken-Image Resilience**: High-fidelity custom SVG hardware illustrations with carbon cones, titanium tweeters, rubber surrounds, and LED rings that render smoothly without depending on fragile external hosts.
- **REST API Endpoints**:
  - `GET /api/products` — Retrieve all speaker systems (supports search, category, sort, price filters)
  - `GET /api/products/:id` — Retrieve single speaker + related recommendations
  - `POST /api/products` — Add a new speaker to the persistent database (Admin)
  - `DELETE /api/products/:id` — Delete a speaker by ID (Admin)
  - `POST /api/products/reset/seed` — Restore the 12 default audiophile speakers
  - `GET /api/contact` — View all customer inquiries in database (Admin)
  - `POST /api/contact` — Validate and save new customer message to database
  - `PATCH /api/contact/:id/status` — Update inquiry status (unread/read/replied)
  - `POST /api/contact/newsletter` — Subscribe email to the Acoustic Inner Circle
  - `POST /api/contact/order` — Place simulated order and receive tracking reference

---

## Project Structure

```text
/
├── backend/
│   ├── db/
│   │   └── database.ts            # Persistent storage engine with 12 seed speakers
│   ├── controllers/
│   │   ├── product.controller.ts  # Handlers for product listing, create, delete
│   │   └── contact.controller.ts  # Handlers for contact messages, newsletter, orders
│   └── routes/
│       ├── product.routes.ts      # Product REST API endpoints
│       └── contact.routes.ts      # Contact and orders REST endpoints
├── data/
│   └── db.json                    # File-based database store (auto-created)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # 3-Zone navigation with active routes & cart trigger
│   │   ├── Footer.tsx             # Trust guarantees, links, and lab disclosures
│   │   ├── ProductCard.tsx        # High-elevation product card with quick-add
│   │   ├── SpeakerIllustration.tsx# Vector SVG acoustic hardware renderer
│   │   ├── CartDrawer.tsx         # Slide-over cart preview drawer
│   │   └── CheckoutModal.tsx      # Multi-step checkout with receipt modal
│   ├── context/
│   │   └── CartContext.tsx        # LocalStorage synced cart & promo engine
│   ├── pages/
│   │   ├── HomePage.tsx           # Hero slider, DSP tester, highlights, newsletter
│   │   ├── ProductsPage.tsx       # Filterable catalog with search and sorting
│   │   ├── ProductDetailPage.tsx  # Interactive gallery & specs table
│   │   ├── AboutPage.tsx          # Brand story, anechoic chamber, team
│   │   ├── ContactPage.tsx        # Database-backed inquiry form & map
│   │   ├── CartPage.tsx           # Full checkout cart view
│   │   └── AdminPage.tsx          # Admin management console
│   ├── services/
│   │   └── api.ts                 # Type-safe client fetch service
│   ├── App.tsx                    # Master client router & layout wrapper
│   ├── index.css                  # Tailwind CSS v4 styling & dark theme
│   └── main.tsx                   # React root entry point
├── server.ts                      # Express server with Vite middleware integration
├── package.json
└── README.md
```

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or yarn

### 2. Installation
Install all dependencies:
```bash
npm install
```

### 3. Environment Variables
Create or verify your `.env` file:
```env
PORT=3000
NODE_ENV=development
```

### 4. Run Development Server
To launch the full-stack server (Express backend + Vite React client):
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## Sample Data & Test Accounts

- **Pre-populated with 12 flagship speaker models** including:
  - *AURA Zenith Reference 9* (3-way floorstanding tower, $1,499)
  - *AURA Studio Monitor X5* (Active nearfield pair, $699)
  - *AURA Nomad Pro Explorer* (IP67 rugged waterproof portable, $299)
  - *AURA CinemaSphere 7.1.4* (Dolby Atmos soundbar + 10" subwoofer, $1,199)
  - *AURA Carbon Sub 12 Pro* (12" 600W active subwoofer down to 18Hz, $899)
- **Promo Code for Testing**:
  - `AUDIO10` — 10% discount on entire cart
  - `VIP20` — 20% VIP acoustic discount
