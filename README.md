# Real-time IoT Device Dashboard

A small demo dashboard built with React + TypeScript + Vite that simulates real‑time IoT device data, lists devices, and shows device detail and historical charts.

This repository is a developer-focused starter app you can use to prototype dashboards for sensors or small fleets of IoT devices. The app uses Tailwind CSS for styling and includes lightweight, reusable components for charts, device cards, and a sidebar navigation.

---

## 🚀 Quick start

Prerequisites: Node 18+ and npm (or yarn/pnpm) installed.

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

### Available npm scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server (hot reloading) |
| `npm run build` | Build production-optimized output into `dist/` |
| `npm run preview` | Serve the production build locally for preview |
| `npm run lint` | Run ESLint across the project |

---

## 🧩 Tech stack

- React + TypeScript
- Vite (dev server & build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- ESLint, PostCSS, Autoprefixer

---

## 🔎 What you'll find in this repo

Key files and folders (short descriptions):

- `index.html` — App entry HTML.
- `src/main.tsx` — React bootstrapping.
- `src/App.tsx` — Top-level app component / basic page routing state.
- `src/pages/` — Main app pages:
  - `DevicesPage.tsx` — Device list / dashboard.
  - `RealTimeDataPage.tsx` — Simulated real-time sensor feed + charts.
  - `DeviceDetailPage.tsx` — Per-device detail and historical chart.
- `src/components/` — Reusable UI components:
  - `Sidebar.tsx` — Navigation sidebar.
  - `DeviceCard.tsx` — Card view for individual devices.
  - `RealTimeChart.tsx` & `DetailChart.tsx` — Small charts for visualizing data.
- `src/types/Device.ts` — TypeScript types & interfaces for devices and data points.

---

## 📁 Folder structure (short)

```
src/
├─ components/   # UI components (charts, cards, sidebar)
├─ pages/        # App pages (Devices, Device detail, Real-time)
├─ types/        # Domain types (Device, DataPoint)
├─ main.tsx      # React entry
└─ App.tsx       # App shell + page routing state
```

---

## ✨ Features

- Simulated real-time sensor updates and small charts for each device
- Device list with status, battery, and last seen metadata
- Device detail screen with historical data visualization and controls
- Small, easy to extend demo: the UI is componentized and type-safe

---

## 🔧 Extending this project

This starter uses in-memory and simulated data for convenience. To connect a real backend:

1. Replace the mock data generation in `src/pages/*` with API calls (e.g., fetch or Axios).
2. Add a data layer (hooks or a small service) to manage polling / websocket streaming of live data.
3. Add tests (Jest/React Testing Library) and CI (GitHub Actions) for end-to-end and unit coverage.

Tips:
- Use websockets (or Server-Sent Events) for lower-latency real-time updates.
- Add state management (Zustand/Redux/React Query) for more complex data flows.

---

## ✅ Contribution & License

Contributions are welcome! If you'd like to help, please follow the guidelines in `CONTRIBUTING.md` and open an issue or a pull request.

This project is provided under the MIT License — see the bundled `LICENSE` file for details.

Author / Contact: Your Name <you@example.com> (update as needed)

---

If you'd like, I can also:
- add screenshots or a short animated GIF to this README (drop the assets in `/public`),
- add a `CONTRIBUTING.md` and `LICENSE` file,
- or wire up a simple mock API server for local development.

Happy hacking! ⚡
