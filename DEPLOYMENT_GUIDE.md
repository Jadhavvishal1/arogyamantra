# Arogya Mantra — Deployment Guide

This guide is for anyone who clones this repository and wants to run it locally or deploy it to production.

---

## Project Structure

```
arogyamantra/
├── client/          ← React + Vite frontend (deployed on Vercel)
└── server/          ← Node.js + Express backend (deployed on Render)
```

---

## Tech Stack

| Part       | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend    | Node.js, Express 4                |
| Database   | MongoDB (Atlas in production)     |
| File uploads | Multer (images + videos)        |
| Hosting    | Frontend → Vercel, Backend → Render |

---

## Running Locally

### Prerequisites
- Node.js v18+ — https://nodejs.org
- Git — https://git-scm.com
- MongoDB running locally OR a MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/Jadhavvishal1/arogyamantra.git
cd arogyamantra
```

### 2. Setup the backend
```bash
cd server
npm install
```

Create a file called `.env` inside the `server/` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/arogyamantra
ADMIN_KEY=arogyamantra2025
```

> For MongoDB Atlas (production), replace MONGO_URI with your Atlas connection string.

Start the backend:
```bash
npm start
```
Backend runs at: http://localhost:5000

### 3. Setup the frontend
```bash
cd ../client
npm install
```

Create a file called `.env` inside the `client/` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```
Frontend runs at: http://localhost:3000

---

## Admin Panel

The admin panel is at: `http://localhost:3000/admin`

**Password:** `arogyamantra2025`

From the admin panel you can:
- Upload the hero banner image
- Upload the clinic logo (shows in navbar + footer)
- Upload doctor photo (Our Story section)
- Upload service images, gallery photos, before/after images, product images
- Add Instagram/YouTube reels by URL or upload video files directly

---

## Deploying to Production

### Step 1 — MongoDB Atlas (database)

1. Go to https://cloud.mongodb.com → sign up free
2. Create a free cluster (M0)
3. Under Security → Database Access → Add a user with a password
4. Under Security → Network Access → Add IP `0.0.0.0/0` (allows all)
5. Click Connect → Drivers → copy the connection string
   - It looks like: `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/arogyamantra`
   - Replace `<password>` with your actual password

### Step 2 — Deploy backend on Render

1. Go to https://render.com → sign up with GitHub
2. New → Web Service → connect the `arogyamantra` repo
3. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | your MongoDB Atlas connection string |
   | `ADMIN_KEY` | `arogyamantra2025` |
   | `PORT` | `5000` |
5. Click Deploy
6. After deploy, copy your Render URL (e.g. `https://arogyamantra-api.onrender.com`)

> Note: On Render's free plan the server sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds. Upgrade to a paid plan to avoid this.

### Step 3 — Deploy frontend on Vercel

1. Go to https://vercel.com → sign up with GitHub
2. New Project → import `arogyamantra` repo
3. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | your Render backend URL (e.g. `https://arogyamantra-api.onrender.com`) |
5. Click Deploy
6. Your site is live at a `.vercel.app` URL

### Step 4 — Connect a custom domain (optional)

In Vercel → your project → Settings → Domains → Add your domain (e.g. `arogyamantra.com`).
Update your domain's DNS A record to point to Vercel's IP as shown in Vercel's UI.

---

## Pushing Updates After Changes

```bash
cd arogyamantra
git add .
git commit -m "describe what you changed"
git push
```

Vercel and Render will automatically redeploy when you push to GitHub.

---

## Environment Variables Summary

### server/.env (never commit this file)
```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/arogyamantra
ADMIN_KEY=arogyamantra2025
```

### client/.env (never commit this file)
```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

---

## Important Notes

- The `uploads/` folder on the server stores admin-uploaded images and videos. On Render's free plan this folder is wiped on each deploy (ephemeral filesystem). For permanent storage, migrate to Cloudinary or AWS S3.
- The `.env` files are in `.gitignore` and will never be pushed to GitHub. You must create them manually on each machine.
- Admin key is currently hardcoded as `arogyamantra2025`. Change it in the server `.env` and update the frontend `AdminPage.jsx` `ADMIN_KEY` constant if you want a different password.
