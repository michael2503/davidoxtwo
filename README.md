# Davidox Limited – Corporate IT Company Website

> **"Transforming Businesses Through Innovative Technology."**

A modern, responsive, corporate IT website and administrative management portal for **Davidox Limited**, built with React, TypeScript, Tailwind CSS, Lucide icons, and integrated directly with **Firebase Cloud Firestore** and **Firebase Authentication**.

---

## 🌟 Key Features

### 1. Public Corporate Website
- **Branded Design System**: Professional Blue (`#0D6EFD`) and Dark Navy (`#071B3A`) visual identity aligned with the Davidox Limited corporate logo.
- **Home Page**:
  - High-impact Hero section with core value proposition and dynamic metrics (99.99% SLA, 150+ delivered projects).
  - Corporate introduction and company capabilities.
  - Interactive services showcase featuring all 10 core offerings.
  - "Why Choose Davidox Limited?" highlighting innovation, certified engineers, and customer-centricity.
  - 5-step Agile working methodology (Consultation, Strategy, Development, Testing, Support).
  - High-conversion Call-to-Action banner.
- **About Us Page**:
  - Comprehensive corporate overview, company story, mission, and vision statements.
  - Six core values: Innovation, Integrity, Excellence, Professionalism, Customer Satisfaction, Reliability.
  - Architectural approach to technology and reasons enterprises trust Davidox Limited.
- **Services Page**:
  - In-depth breakdowns of all 10 IT verticals:
    1. Web Application Development
    2. Mobile Application Development
    3. Custom Software Development
    4. Cloud Computing Solutions
    5. IT Consulting and Advisory
    6. Computer Networking and Infrastructure
    7. UI/UX Design
    8. Business Process Automation
    9. Digital Transformation
    10. IT Support and Maintenance
  - Quick category filtering tabs, business benefits, and technology stacks.
  - Direct "Request a Consultation" deep-links into the contact form prefilled with the service name.
- **Contact Us Page**:
  - Office address, phone numbers, corporate email, business hours, and social channels.
  - Validated contact form using **React Hook Form** + **Zod**.
  - Direct submission into Firebase Firestore `contact_messages` collection.
  - Duplicate submission prevention, loading spinners, and celebratory confetti.
- **Custom 404 Page**: Branded error state with easy return shortcuts.

### 2. Secure Administrator Control Portal (`/admin`)
- **Authentication**: Firebase Authentication with Email/Password and Google sign-in.
- **RBAC Security**: Protected admin routes with server-checked administrative authorization (`omotoshomichael2503@gmail.com`). Public visitor registration is strictly forbidden.
- **Dashboard Overview**:
  - Live statistic cards: Total, New, Read, Replied, and Archived messages.
  - Real-time Firestore synchronization (`onSnapshot`).
  - Searchable recent enquiries table.
- **Contact Enquiries Management**:
  - Real-time search across client name, email, subject, company, and service.
  - Status filtering (`new`, `read`, `replied`, `archived`).
  - Date filtering (`today`, `7days`, `30days`).
  - Sort by newest or oldest, with pagination.
  - Detail modal with full enquiry details and automatic status transition to `read`.
  - Single-click action buttons: Mark Replied, Archive, Delete with confirmation modal.
  - One-click **Reply via Email** button with prefilled mailto client and subject.
- **Admin Profile**:
  - Account info, UID, and session status.
  - In-app password change form.
  - Connected Firebase project and Firestore database telemetry.
  - Secure sign-out.

---

## 🚀 Deployment to Vercel

### Step 1: Push Repository to GitHub
Push this codebase to your GitHub repository.

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your Davidox Limited repository.
3. Framework Preset: **Vite** (detected automatically).
4. Build Command: `npm run build`
5. Output Directory: `dist`

### Step 3: Add Environment Variables in Vercel
In the Vercel Project Settings under **Environment Variables**, add:

| Variable Name | Description | Example Value |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSyBwoFNYnEaTzw7YzDedMc7YQyqviB74jMI` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `gen-lang-client-0938852793.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | `gen-lang-client-0938852793` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage Bucket | `gen-lang-client-0938852793.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| Sender ID | `12295779759` |
| `VITE_FIREBASE_APP_ID` | Firebase Web App ID | `1:12295779759:web:f2888c499fa5a50a75ab5a` |
| `VITE_FIREBASE_DATABASE_ID` | Firestore Database ID | `ai-studio-f74f2dba-1fad-4b66-9015-9bfd7800c521` |

*(Note: The application also includes `firebase-applet-config.json` as a seamless fallback).*

### Step 4: Deploy
Click **Deploy**. `vercel.json` ensures all nested client routes (e.g., `/services`, `/contact`, `/admin/messages`) work seamlessly on page refresh.

---

## 🔒 Firebase Security & Admin Setup

### Firestore Security Rules
The rules in `firestore.rules` enforce:
- Public visitors can only create valid contact messages (`status == 'new'`, `isRead == false`, bounded strings).
- Public visitors cannot read, list, modify, or delete any messages.
- Only authenticated and authorized administrators can read, update statuses, and delete records.

### Creating Additional Admin Accounts
1. Open the [Firebase Console](https://console.firebase.google.com).
2. Go to **Authentication** > **Users** and click **Add User**.
3. Create an account with the desired admin email and password.
4. Go to **Firestore Database** > `admins` collection.
5. Create a document with the user's `UID` containing `{ "email": "admin@example.com", "role": "admin" }`.
*(The primary account `omotoshomichael2503@gmail.com` is pre-authorized by rule design).*

---

## 🧪 Testing the Workflow

1. Open the website at `/contact`.
2. Fill out the contact form (e.g. choose "Cloud Computing Solutions") and click **Send Message**.
3. Confirm the success notification and confetti animation appear.
4. Navigate to `/admin` (or click **Admin Access** in the footer).
5. Sign in using your administrator credentials (or click Google sign-in).
6. Verify your new submission appears in the Dashboard and Contact Enquiries table.
7. Click **View** on the message: notice it automatically marks as `read`.
8. Click **Mark Replied** or **Archive**, or click **Reply via Email** to launch your email client.
