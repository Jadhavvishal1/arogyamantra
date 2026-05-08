# 🌿 Arogya Mantra — Complete Setup & Deployment Guide

## Project Structure

```
arogyamantra/
├── client/                   ← React frontend (Vite)
│   ├── public/
│   │   ├── logo.png          ← Drop your logo here
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── Instagram.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                   ← Node.js + Express backend
│   ├── models/
│   │   ├── Appointment.js
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── .env
│   └── server.js
└── README.md
```

---

## STEP 1: Set Up on Your Laptop (VSCode)

### Prerequisites — Install these first:
- Node.js v20+ → https://nodejs.org
- Git → https://git-scm.com
- VSCode → https://code.visualstudio.com

### Create the React app:
```bash
# Open terminal in VSCode (Ctrl + `)
mkdir arogyamantra && cd arogyamantra

# Create frontend with Vite
npm create vite@latest client -- --template react
cd client
npm install

# Install needed packages
npm install react-router-dom framer-motion axios react-hot-toast

# Copy the index.html content into src/ components
```

---

## STEP 2: Push to GitHub

```bash
# Go to root folder
cd ..  # back to arogyamantra/

# Initialize Git
git init
git add .
git commit -m "🌿 Initial commit — Arogya Mantra frontend"

# Create repo on GitHub:
# 1. Go to github.com → New Repository
# 2. Name it: arogyamantra-website
# 3. Keep it Public (for free Hostinger deploy)
# 4. Don't add README (you already have files)

# Connect and push
git remote add origin https://github.com/YOUR_USERNAME/arogyamantra-website.git
git branch -M main
git push -u origin main
```

### Tip: Use GitHub Desktop app if command line feels tough.

---

## STEP 3: Build the React App for Production

```bash
cd client
npm run build
# This creates a /dist folder with optimized files
```

---

## STEP 4: Host on Hostinger

### Option A — Static Hosting (Cheapest, Frontend Only)
1. Log in to Hostinger → hPanel
2. Go to **File Manager** → public_html
3. Upload everything from `client/dist/` folder
4. Done! Your site is live.

### Option B — Full MERN Stack on Hostinger VPS
1. Buy Hostinger **VPS** plan (₹350–800/month)
2. Use Node.js hosting or set up PM2

```bash
# On Hostinger VPS via SSH:
ssh root@YOUR_VPS_IP

# Install Node
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 (keeps Node running)
npm install -g pm2

# Clone your repo
git clone https://github.com/YOUR_USERNAME/arogyamantra-website.git
cd arogyamantra-website/server

# Install and start
npm install
pm2 start server.js --name "arogyamantra-api"
pm2 save
pm2 startup
```

### Connect your domain:
1. Hostinger hPanel → **Domains** → point your domain
2. Set **A Record** → your VPS IP
3. Enable **SSL** (free with Hostinger) → toggle on

---

## STEP 5: Environment Variables (.env)

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/arogyamantra
JWT_SECRET=your_super_secret_key_here
EMAIL_USER=arogyamantraclinic@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

> ⚠️ Never push .env to GitHub. Add it to .gitignore

---

## STEP 6: MongoDB Setup (Free)

1. Go to → https://mongodb.com/atlas
2. Create free cluster
3. Add your IP to whitelist (or 0.0.0.0/0 for all)
4. Copy connection string → paste in .env

---

## Quick Commands Reference

```bash
# Run frontend locally
cd client && npm run dev      # Runs on http://localhost:5173

# Run backend locally  
cd server && node server.js   # Runs on http://localhost:5000

# Build for production
cd client && npm run build

# Push updates to GitHub
git add . && git commit -m "Update" && git push
```

---

## Payment Integration (Razorpay — Indian)

```bash
npm install razorpay
```

Add to your product checkout — Razorpay works best for Indian payments and supports UPI, cards, net banking, wallets.

---

## VSCode Extensions to Install

- **ES7 React Snippets** — faster React coding
- **Tailwind CSS IntelliSense** — if you use Tailwind
- **GitLens** — better Git visibility
- **Prettier** — auto format code
- **Thunder Client** — test your APIs

---

## Recommended Tech Stack for This Project

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | CSS Variables (already done) |
| Routing | React Router DOM v6 |
| Animation | Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT |
| Payments | Razorpay |
| Email | Nodemailer + Gmail |
| Hosting | Hostinger VPS |
| Domain | Hostinger / GoDaddy |
| CI/CD | GitHub Actions (optional) |

---

## Files to Replace with Real Content

1. **Logo**: Replace the SVG in Navbar with `<img src="/logo.png">`
2. **Doctor photo**: Replace the 👩‍⚕️ emoji in About with `<img src="/doctor.jpg">`  
3. **Product photos**: Replace emojis in Shop with real product images
4. **Phone number**: Replace `+91 98765 43210` with real number
5. **Instagram handle**: Update `@arogyamantra_clinic` to real handle
6. **Google Maps**: Update the embed URL with exact clinic coordinates
7. **Email**: Update to real clinic email

---

*Built with ❤️ for Arogya Mantra — Ancient Wisdom, Modern Wellness*
