# Tech-Stack Recommendation Engine
**CSC400 - Computer Science Project Seminar Capstone**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview
The Tech-Stack Recommendation Engine is an interactive, web-based tool designed to eliminate analysis paralysis for developers starting new projects. By processing specific project requirements (scale, data relationships, timeline) through a custom heuristic decision-tree algorithm, the engine outputs an optimal, deterministic technology stack recommendation along with a visual system architecture diagram.

## The Team
* **Frontend UI & Authentication:** Cameron Johnson
* **Backend Architecture & Algorithm:** Joshua Kuklinski
* **Database Schema & System Diagrams:** Tasnim Abdalhak

## Technology Stack
* **Frontend:** React
* **Backend Framework:** Next.js (API Routes)
* **Database:** PostgreSQL
* **Deployment:** Vercel

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your local machine. You will also need a local or cloud instance of PostgreSQL running.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/csc400-capstone.git](https://github.com/your-username/csc400-capstone.git)
   cd csc400-capstone
   ```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development Phases
* **Phase 1 (Weeks 1-3):** Foundation, database schema mapping, and UI wireframing.
* **Phase 2 (Weeks 4-7):** Core Next.js routing, React components, and PostgreSQL connection.
* **Phase 3 (Weeks 8-11):** Heuristic algorithm integration and visual diagram generation.
* **Phase 4 (Weeks 12-16):** QA testing, final styling, and deployment.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.