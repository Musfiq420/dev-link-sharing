# Dev Link Sharing App 🔗

A simple **link sharing app** built with **Next.js 14 App Router**, **NextAuth.js**, and **MongoDB**. This app allows users to manage and share their development-related links (like GitHub, portfolio, and more). Users can also edit their profile and access the preview of their public profile.

---

## **Features**
- Google authentication with **NextAuth.js**.
- User profile management (first name, last name, email, and photo).
- Add and manage multiple development links (e.g., GitHub, YouTube).
- Preview mode to share your profile with others.
- Fully responsive design with **dynamic layouts** for mobile and desktop.

---

## **Tech Stack**
- **Frontend**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js (Google Provider)
- **Database**: MongoDB
- **Styling**: CSS Modules
- **Deployment**: Vercel (Optional)

---

## **Getting Started**

### **Prerequisites**
Before you begin, ensure you have the following installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (Local or MongoDB Atlas)
- **Google Cloud Console** (to create OAuth credentials for Google login)

---

## **Step 1: Clone the Repository**
```bash
git clone https://github.com/your-username/dev-link-sharing-app.git
cd dev-link-sharing-app
```
---

## **Step 2: Install Dependencies**
```bash
npm install
# or
yarn install
```
---

## **Step 3: Set Up Environment Variables**
### 1. Create a .env.local file in the root of the project with the following content:
```
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB Connection URI (for MongoDB Atlas or local MongoDB)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dev-link-sharing?retryWrites=true&w=majority

# NextAuth Secret (for security)
NEXTAUTH_SECRET=your-random-secret
```
### 2. Google OAuth Credentials:
  - Go to the [Google Cloud Console](https://console.cloud.google.com).
  - Create a new project and generate **OAuth 2.0 credentials**.
  - Add `http://localhost:3000` to the **Authorized Redirect URIs**.

### 3. MongoDB URI:
  - Use **MongoDB Atlas** for a cloud database or set up **local MongoDB** and provide the connection string.

---

## **Step 4: Run the App Locally**
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

---

## **Step 5: Database Setup**
The app will automatically create collections in your MongoDB database when you run it. Ensure your **MongoDB URI** in the `.env.local` file is correctly configured.

---

## **Step 6: Authentication Setup with NextAuth.js**
  - Google OAuth is used for login.
  - On the home page, click **"Login with Google"**.
  - After signing in, you'll be redirected to the **editor page** to manage your profile and links.
