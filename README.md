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
Make sure you have Node.js and npm installed on your local machine.

### Prisma / Auth environment setup

`.env.example` in the project root is **only a template**. Prisma and Next.js **do not read** `.env.example`.

Each developer must create their own real **`.env`** file in the **project root** (same folder as `package.json`). The filename must be exactly `.env` — not `.env.txt`, not `.env.example`, and not a file inside another folder.

Your real `.env` file must include:

```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="your-generated-secret-here"
```

- `DATABASE_URL="file:./dev.db"` tells Prisma to create and use a local SQLite database at `prisma/dev.db` when you run migrations.
- `SESSION_SECRET` is used to sign authentication session cookies. Use a long random string locally.

**Never commit your real `.env` file.**

Generate a secure local session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output into `.env` as the value for `SESSION_SECRET`.

#### Create `.env` on Windows (PowerShell)

From the project root:

```powershell
Copy-Item .env.example .env
```

Then open `.env`, replace `SESSION_SECRET` with your generated secret, and save.

#### Troubleshooting: `Environment variable not found: DATABASE_URL`

If `npx prisma migrate dev` fails with:

```text
Error: Prisma schema validation - P1012
Environment variable not found: DATABASE_URL
```

then one of the following is true:

1. You have **not created** a real `.env` file in the project root.
2. The file is **named incorrectly** (for example `.env.txt` instead of `.env`).
3. `.env` exists but is **missing** `DATABASE_URL`, or the line is misspelled.

Fix: create or rename the file to `.env` in the project root and include `DATABASE_URL="file:./dev.db"`.

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:joshkukl/csc400-capstone.git
   cd csc400-capstone
   ```

2. **Create your local `.env` file** (see [Prisma / Auth environment setup](#prisma--auth-environment-setup) above).

3. **Install dependencies and set up the database:**
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   npm run dev
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