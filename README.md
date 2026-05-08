# 🌿 Arogya Mantra — MERN Stack Website

**Dr. Vrushali Maisekar | Ayurvedic Clinic + Ecommerce | Hadapsar, Pune**

---

## 🚀 Open in VS Code (Step by Step)

### Step 1 — Extract & Open

1. Extract the zip file to a folder (e.g. `Desktop/arogyamantra`)
2. Open VS Code
3. File → **Open Workspace from File** → select `arogyamantra.code-workspace`
   - OR: File → Open Folder → select the `arogyamantra` folder

### Step 2 — Install Extensions (Recommended)

VS Code will prompt you to install recommended extensions. Click **Install All**. Or install manually:
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **ES7+ React Snippets** (dsznajder.es7-react-js-snippets)
- **Prettier** (esbenp.prettier-vscode)
- **MongoDB for VS Code** (mongodb.mongodb-vscode)

### Step 3 — Install Dependencies

Open Terminal in VS Code (`Ctrl+` ` ` or View → Terminal):

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

Or simply run:
```bash
npm run install-all
```

### Step 4 — Setup Environment Variables

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/arogyamantra
```

> 💡 **MongoDB not installed?** The site works without MongoDB — appointments will respond gracefully. To install MongoDB: https://www.mongodb.com/try/download/community

### Step 5 — Run the Project

From the root folder:
```bash
npm run dev
```

This starts **both** servers simultaneously:
- ⚛️  React frontend → **http://localhost:3000**
- 🟢 Express backend → **http://localhost:5000**

---

## 📁 Project Structure

```
arogyamantra/
├── client/                   ← React + Vite frontend
│   └── src/
│       ├── components/       ← Reusable UI components
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Services.jsx
│       │   ├── ShopPreview.jsx
│       │   ├── ProductCard.jsx
│       │   ├── Reviews.jsx
│       │   ├── FAQ.jsx
│       │   ├── Contact.jsx
│       │   ├── Footer.jsx
│       │   ├── CartDrawer.jsx
│       │   └── WhatsAppFab.jsx
│       ├── context/
│       │   └── CartContext.jsx   ← Cart state management
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── ShopPage.jsx
│       │   └── BookingPage.jsx
│       ├── data.js               ← Products, services, reviews data
│       ├── App.jsx
│       └── main.jsx
├── server/                   ← Node.js + Express backend
│   ├── models/
│   │   ├── Appointment.js    ← MongoDB schema
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── appointments.js   ← POST /api/appointments
│   │   ├── products.js       ← GET /api/products
│   │   └── orders.js         ← POST/GET /api/orders
│   ├── server.js             ← Express entry point
│   └── .env                  ← Your environment variables
├── package.json              ← Root (runs both servers)
└── arogyamantra.code-workspace
```

---

## 🔧 What to Customize

### Replace Placeholders
| Item | Where | What to do |
|------|--------|------------|
| Phone number | `WhatsAppFab.jsx`, `Contact.jsx`, `BookingPage.jsx` | Replace `919XXXXXXXXX` with real number |
| Google Maps embed | `Contact.jsx` | Replace embed URL with exact clinic GPS |
| Doctor photo | `About.jsx` | Replace Unsplash URL with real photo |
| Product images | `data.js` | Replace Unsplash URLs with real product photos |
| Instagram handle | `Footer.jsx` | Update to real account |
| Email | `Contact.jsx` | Update to real clinic email |

### Add Real Product Images
In `client/src/data.js`, update each product's `image` field:
```js
image: '/images/hair-oil.jpg'  // put images in client/public/images/
```

---

## 💳 Razorpay Payment Integration

1. Sign up at https://razorpay.com
2. Get your Key ID and Secret
3. Add to `server/.env`:
```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```
4. Install: `cd server && npm install razorpay`
5. Create `server/routes/payment.js` for order creation + webhook verification

---

## 🌐 Deploy to Hostinger

### Frontend (Static)
```bash
cd client && npm run build
```
Upload the `client/dist/` folder to Hostinger's `public_html`.

### Backend (VPS)
```bash
# On Hostinger VPS
npm install -g pm2
cd server && npm install
pm2 start server.js --name arogyamantra-api
pm2 save && pm2 startup
```

---

## 🗂️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/appointments` | Book appointment |
| GET | `/api/appointments` | List all appointments |
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=hair` | Filter by category |
| POST | `/api/orders` | Create order |

---

*Built for Dr. Vrushali Maisekar — Arogya Mantra Multispeciality Clinic, Hadapsar, Pune*
