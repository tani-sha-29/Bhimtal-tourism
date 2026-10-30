# Bhimtal Portal Frontend (`bhimtal-frontend`)

A modern, high-performance web portal for Bhimtal Tourism designed with a dark-mode, 21st.dev / Aceternity UI aesthetic inspired by Google Antigravity. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Leaflet**.

---

## 🎨 Design System & Theme

- **Palette**: Deep dark space background (`#0a0f1d`) with vibrant emerald (`#10b981`) and cyan (`#06b6d4`) glowing accents mirroring Bhimtal's emerald waters.
- **Glassmorphism**: Frosted glass panels (`backdrop-blur-xl bg-slate-900/60 border border-white/10`).
- **Interactive Lighting**: Ambient Spotlight Cards that track cursor movement with radial gradient glowing borders.
- **Micro-Interactions**: Smooth spring modals and particle beam animations powered by `framer-motion`.

---

## 🚀 Key Features & Pages

### 1. Landing Page (`app/page.tsx`)
- **Hero Section**: Glowing typography, live Himalayan altitude badges, floating particle beams (`components/ui/BackgroundBeams.tsx`), and trip planner CTA.
- **Live Weather Widget (`components/ui/WeatherWidget.tsx`)**: Fetches live temperature, wind speed, elevation stats (1,370 m), and lake status ("Ideal for Boating & Paragliding").
- **Asymmetrical Bento Grid (`components/ui/BentoGrid.tsx`)**: Visual showcase featuring Bhimtal Lake, Hidimba Parvat Trek (1,850 m), Tandem Paragliding, and Sattal Seven Lakes with live status badges.
- **Explore Landmarks (`components/PlacesSection.tsx`)**: Filterable places grid (Lakes, Treks, Temples, Attractions) with difficulty indicators and live keyword search.
- **Homestays & Resorts (`components/StaysSection.tsx`)**: Handpicked accommodations with nightly rates, verified host badges, and amenity tags.
- **Outdoor Adventures (`components/AdventuresSection.tsx`)**: Paragliding, Kayaking, Boating, and Guided Treks with instant booking integration.

### 2. Interactive Map Page (`app/map/page.tsx`)
- Dark-mode **Leaflet / OpenStreetMap** map centered on Bhimtal (`29.3499, 79.5544`).
- Custom glowing SVG/div markers color-coded by category (Lakes: cyan, Treks: amber, Temples: pink, Attractions: purple).
- Interactive sidebar list of landmarks with GPS coordinates and instant Google Maps directions.
- Client-side dynamic import (`ssr: false`) preventing hydration issues.

### 3. Dynamic Place Detail Page (`app/places/[slug]/page.tsx`)
- Dedicated showcase for individual landmark slugs (e.g. `/places/bhimtal-lake`, `/places/hidimba-parvat-trek`).
- Hero visual banner, detailed guides, elevation badges, and direct inquiry actions.

### 4. Booking & Inquiry Desk (`app/inquire/page.tsx` & `components/ui/InquiryModal.tsx`)
- Floating modal with smooth spring animations.
- Connects directly to the Spring Boot REST API (`POST /api/v1/inquiries`).
- Real-time submission state with loading indicator, error handling, and confirmation receipt.

---

## 🔌 Backend Integration (`lib/api.ts`)

The frontend communicates with the Spring Boot backend service at:
```bash
# In .env.local
NEXT_PUBLIC_API_URL=http://localhost:8081/api/v1
```

### Endpoints Integrated:
- `GET /api/v1/places`: Fetches all landmark places with optional category & keyword search.
- `GET /api/v1/places/slug/{slug}`: Fetches individual landmark details.
- `GET /api/v1/stays`: Fetches homestays and resorts with filtering.
- `GET /api/v1/adventures`: Fetches outdoor activities.
- `POST /api/v1/inquiries`: Sends booking inquiries and triggers automated confirmation emails.
- **Resilient Fallback Mode**: If the backend is starting up or offline, the frontend seamlessly uses embedded authentic Bhimtal landmark data, guaranteeing a flawless UI experience at all times.

---

## 💻 Running the Frontend

### Development Mode:
```bash
cd bhimtal-frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
cd bhimtal-frontend
npm run build
npm start
```
