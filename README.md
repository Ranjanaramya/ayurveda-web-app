# 🌿 AyurVeda Care Hospital - Web Application

A modern, high-performance web platform for **AyurVeda Care Hospital**, built with **Next.js 15 (App Router)**, **React 19**, **TailwindCSS**, **Framer Motion**, and **Sanity Studio v3**.

---

## 🚀 Key Features

- **🌿 Animated Nature Hero & Nature Footer**:
  - Continuous smooth background scale animation (`motion.img`) with dark/mint backdrop filters.
  - Interactive Nature Footer with glassmorphism cards and smooth hover zoom effects.
- **⭐ Patient Feedback & Moderation Workflow**:
  - Patients can submit reviews with verified **Patient ID** (`PAT-XXXX`).
  - Integrated **Sanity Studio Review Schema** (`sanity/schemaTypes/review.ts`) with moderation flag (`approved = true`) preventing unapproved reviews from displaying publicly until verified by administrators.
- **📍 Hospital Location Map & Legal Compliance**:
  - Embedded Google Maps location map paired side-by-side with Privacy Policy & Terms & Conditions cards.
- **📅 Interactive Appointment & OPD Consultation Scheduler**:
  - Pre-fill treatment selections, physician preferences, and time slots.
- **🩺 Doctors & Clinical Specializations Directory**:
  - Comprehensive profiles for senior BAMS/MD specialists and treatment wings (Panchakarma, Shirodhara, Kati Vasti, etc.).
- **📰 Health & Wellness Blogs**:
  - Dynamic article pages with reading time estimates, categories, and medical disclaimer tags.
- **🛡️ Embedded Sanity Studio CMS**:
  - Mounts directly at `/studio` for managing content, patient inquiries, and review approvals.

---

## 📁 Project Structure

```text
ayurvedic-hospital/
│
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  // Home Page
│   │   ├── treatments/               // Treatments Directory
│   │   ├── doctors/                  // Doctors Directory
│   │   ├── blogs/                    // Health Articles List
│   │   │   └── [id]/                 // Dynamic Article Page
│   │   ├── contact/                  // Contact & Inquiry Form
│   │   └── appointment/              // Booking & Slot Scheduler
│   │
│   ├── api/
│   │   └── revalidate/               // Sanity Webhook On-Demand Revalidation
│   │
│   ├── studio/                       // Embedded Sanity Studio Mount (/studio)
│   ├── globals.css                   // Design System Tokens & Utility Classes
│   ├── layout.tsx                    // Root App Layout
│   └── not-found.tsx                 // Custom 404 Page
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                // Header Navigation
│   │   ├── Footer.tsx                // Nature Footer & Map
│   │   └── LayoutShell.tsx           // Theme & Context Provider Shell
│   │
│   └── home/
│       ├── PatientReviewModal.tsx    // Review Submission Modal
│       └── DynamicCounters.tsx       // Animated Hospital Statistics
│
├── sanity/
│   ├── schemaTypes/                  // Sanity Schemas (Review, Doctor, Treatment, etc.)
│   ├── env.ts                        // Sanity Environment Variables
│   └── structure.ts                  // Studio Structure Customization
│
├── lib/
│   ├── sanity/                       // GROQ Queries & Sanity Client Fetchers
│   ├── mockSanity.ts                 // Local Storage Data Fallback Store
│   └── constants.ts                  // Navigation & Hospital Info Constants
│
├── services/
│   └── reviewService.ts              // Patient Review Submission & Moderation API
│
├── .env.example                      // Environment Template
├── .env.local                        // Local Environment Overrides
└── next.config.ts                    // Next.js Configuration
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### `.env.local` Configuration:
```env
APP_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Sanity Studio CMS Configuration
# Set to your active Sanity Project ID. Defaults to "mock-id" for built-in local persistence.
NEXT_PUBLIC_SANITY_PROJECT_ID="mock-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2026-07-20"

# Optional: Secret token for on-demand revalidation
REVALIDATE_SECRET="ayurveda_secret_token"
```

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Open Sanity Studio CMS**:
   Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

4. **Verify TypeScript & Production Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

---

## 📄 License

Distributed under the MIT License. Manufactured for AyurVeda Care Hospital.
