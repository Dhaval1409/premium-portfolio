# Premium Portfolio

A full-stack personal portfolio platform with a **Next.js** frontend and an **Express + MongoDB (TypeScript)** backend. It serves as a dynamic portfolio site with projects, a blog, a contact form, and an admin-only API for managing content.

## Tech Stack

**Frontend (`client/`)**
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS 4

**Backend (`server/`)**
- Node.js + Express 5 (TypeScript)
- MongoDB with Mongoose
- JWT-based authentication (`jsonwebtoken`, `bcryptjs`)
- Deployed via Vercel (`vercel.json` included)

## Project Structure

```
premium-portfolio/
├── client/                  # Next.js frontend
│   └── src/
│       ├── components/
│       │   └── portfolio/   # UI components (Hero, etc.)
│       ├── lib/             # API client & utilities
│       └── types/           # Shared TypeScript types (Project, BlogPost)
│
└── server/                  # Express API
    └── src/
        ├── app.ts           # App entry point & route mounting
        ├── config/db.ts     # MongoDB connection
        ├── controllers/     # Route handlers (auth, blog, project)
        ├── middleware/      # JWT auth guard (`protect`)
        ├── models/          # Mongoose schemas (Project, Blog, Contact)
        └── routes/          # Express routers
```

## Features

- **Projects API** – public listing/detail by slug, admin-protected create/update/delete
- **Blog API** – public listing/detail by slug, admin-protected create/update/delete
- **Contact API** – public submission endpoint, stores messages in MongoDB for review
- **Auth** – single admin login that issues a JWT, used to protect write operations
- **Health check** – `GET /health` for uptime monitoring

## API Overview

| Method | Endpoint                  | Description                  | Auth |
|--------|----------------------------|-------------------------------|------|
| POST   | `/api/auth/login`          | Admin login, returns JWT      | —    |
| GET    | `/api/projects`            | List all projects             | —    |
| GET    | `/api/projects/:slug`      | Get project by slug           | —    |
| POST   | `/api/projects`            | Create project                | ✅   |
| PUT    | `/api/projects/id/:id`     | Update project                | ✅   |
| DELETE | `/api/projects/id/:id`     | Delete project                | ✅   |
| GET    | `/api/blogs`                | List all blog posts           | —    |
| GET    | `/api/blogs/:slug`          | Get blog post by slug         | —    |
| POST   | `/api/blogs`                | Create blog post              | ✅   |
| PUT    | `/api/blogs/id/:id`          | Update blog post              | ✅   |
| DELETE | `/api/blogs/id/:id`          | Delete blog post              | ✅   |
| POST   | `/api/contact`              | Submit a contact message      | —    |
| GET    | `/api/contact`              | List contact messages         | —    |
| DELETE | `/api/contact/id/:id`        | Delete a contact message      | —    |

✅ = requires `Authorization: Bearer <token>` header (JWT from `/api/auth/login`)

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (e.g. MongoDB Atlas)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd premium-portfolio

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `server/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create a `.env.local` file inside `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run in development

In one terminal, start the backend:

```bash
cd server
npm run dev
```

In another terminal, start the frontend:

```bash
cd client
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### 4. Build for production

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
npm start
```

## Deployment

The backend includes a `vercel.json` for deployment to Vercel as a serverless Express app. The frontend (Next.js) can be deployed to Vercel directly. Make sure to:
- Set `MONGO_URI` and `JWT_SECRET` as environment variables in your Vercel project settings (backend)
- Set `NEXT_PUBLIC_API_URL` to your deployed backend URL (frontend)
- Update the CORS `origin` allow-list in `server/src/app.ts` to include your deployed frontend domain

## Notes / Known TODOs

- `server/src/routes/ai.ts` references an `aiBlogger` service (automated blog generation via NewsAPI + Gemini) that isn't included in this codebase yet — add the service file or remove the route before deploying.
- The `/api/contact` GET and DELETE routes are currently public; consider adding the `protect` middleware so only the admin can view/delete messages.

## License

ISC
