# SENS Website

## Overview
This is a Next.js 16.1.1 website project using React 19, TypeScript, and Tailwind CSS 4.

## Project Structure
- `src/app/` - Next.js App Router pages and components
  - `page.tsx` - Main homepage with animations and sections
  - `layout.tsx` - Root layout component  
  - `globals.css` - Global styles with Tailwind
- `public/` - Static assets
- `next.config.ts` - Next.js configuration

## Tech Stack
- **Framework**: Next.js 16.1.1
- **UI**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5

## Development
The development server runs on port 5000:
```bash
npm run dev -- -p 5000 -H 0.0.0.0
```

## Build & Production
```bash
npm run build
npm start -- -p 5000
```

## Notes
- The site uses custom fonts that should be placed in `/public/fonts/`
- Configured with `allowedDevOrigins` for Replit proxy compatibility
