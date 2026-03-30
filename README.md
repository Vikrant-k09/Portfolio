# Vikrant Portfolio

A production-ready personal portfolio for Vikrant, built as a full-stack app with a React/Vite frontend and an Express backend. The visual direction is inspired by Himalayan peaks: snow-white surfaces, slate typography, ice-blue accents, and a custom Three.js mountain scene in the hero.

## Stack

- Frontend: React 18, Vite, Tailwind CSS v3, Framer Motion, React Router v6, Axios, React Icons, Three.js with `@react-three/fiber` and `@react-three/drei`
- Backend: Node.js, Express.js, Resend-ready email delivery, optional Nodemailer SMTP fallback, express-rate-limit, helmet, cors, dotenv
- Root tooling: npm workspaces + concurrently

## Project Structure

```text
.
├── frontend/
├── backend/
├── .env.example
├── package.json
└── README.md
```

## Setup

1. Install dependencies from the repo root:

   ```bash
   npm install
   ```

2. Create a root `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Update the email settings so the contact form can send email.

   Recommended for production and free Render deployments: use Resend.

4. Optional: replace the social/profile URLs and resume URL in `.env` with the real links you want deployed.

5. Start the app in development:

   ```bash
   npm run dev
   ```

   Frontend: `http://localhost:5173`
   Backend API: `http://localhost:5050`

## Environment Variables

Required for backend email delivery on Render/free hosting:

```env
PORT=5050
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=Portfolio <onboarding@resend.dev>
CONTACT_RECEIVER=vik.t.905@gmail.com
```

Optional local SMTP fallback:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

Optional frontend/runtime overrides:

```env
VITE_API_BASE_URL=
VITE_PROXY_TARGET=http://localhost:5050
VITE_GITHUB_URL=https://github.com/vikrant905
VITE_LINKEDIN_URL=https://www.linkedin.com/in/vikrant905/
VITE_RESUME_URL=https://example.com/resume.pdf
VITE_STREAMFORGE_SOURCE_URL=https://github.com/vikrant905/streamforge
VITE_DROPLY_SOURCE_URL=https://github.com/vikrant905/droply
```

Notes:

- Vite is configured with `envDir: '..'`, so the frontend reads the root `.env`.
- The backend loads the same root `.env`, which keeps deployment configuration in one place.
- If `/frontend/public/avatar.webp` is not present, the About section automatically falls back to a styled initial card.
- On free Render, SMTP ports are blocked, so the contact form should use `RESEND_API_KEY` + `RESEND_FROM_EMAIL`.

## Scripts

From the repo root:

```bash
npm run dev
npm run build
npm run start
```

- `npm run dev` runs Vite and Express together.
- `npm run build` creates the frontend production bundle and verifies the backend workspace.
- `npm run start` starts the Express server, which serves the built frontend from `frontend/dist` when it exists.

## Contact API

`POST /api/contact`

Expected body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello Vikrant"
}
```

Behavior:

- Validates required fields
- Validates email format
- Limits message length to 2000 characters
- Rate limits to 5 requests per 15 minutes per IP
- Sends email through Resend when `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set
- Falls back to SMTP with Nodemailer when Resend is not configured

## Deployment Notes

- Build the frontend with `npm run build`
- Set the production `.env` values on the server
- Start the backend with `npm run start`
- The backend serves the compiled frontend automatically when `frontend/dist` exists
- For Vercel + Render, set `VITE_API_BASE_URL` on Vercel to your Render backend URL ending in `/api`
