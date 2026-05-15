# Tripti Shrivastava — Portfolio

Full-stack portfolio: **React (Vite)** client + **Node.js (Express)** server.

---

## 🗂️ Structure

```
portfolio/
├── client/   ← React + Vite + Tailwind + Framer Motion
└── server/   ← Node.js + Express + Nodemailer
```

---

## 🚀 Quick Start

### 1. Server Setup

```bash
cd server
npm install

# Copy env and fill in values
cp .env.example .env
# Edit .env with your Gmail credentials

# Place your resume PDF here:
# server/assets/Tripti_Shrivastava_Resume.pdf

npm run dev      # starts on :5000
```

### 2. Client Setup

```bash
cd client
npm install
npm run dev      # starts on :5173
```

> Vite proxy forwards `/api/*` → `http://localhost:5000` automatically. No CORS issues in dev.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/contact` | Send contact form email |
| GET | `/api/resume` | Resume metadata |
| GET | `/api/resume/download` | Download PDF |

---

## 📧 Contact Form — Body Schema

```json
{
  "name": "string (required, 2-80 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, 10-2000 chars)",
  "subject": "string (optional)"
}
```

---

## 📦 Production Build

```bash
# Build client
cd client && npm run build   # outputs to client/dist

# Serve dist via Express (add static middleware in server/index.js)
```

---

## 🛠️ Tech Stack

**Client:** React 18, Vite, Tailwind CSS, Framer Motion, Axios, react-type-animation, Lucide Icons  
**Server:** Node.js, Express, Nodemailer, express-validator, express-rate-limit, Helmet, CORS, Morgan

---

## 📁 Client Sections

- `Hero` — Typing animation, CTA, social links
- `About` — Bio + animated stats
- `Skills` — Progress bars with filter
- `Projects` — Cards with category filter
- `Services` — Premium service cards
- `Journey` — Timeline
- `Testimonials` — Glass cards
- `Contact` — Form → Express → Nodemailer

---

*Designed & Developed by Tripti Shrivastava*
