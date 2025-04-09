# 🔐 NextSecure

**NextSecure** is a simple but powerful full-stack authentication system built with **Next.js 14**, **TypeScript**, and **MongoDB**. It provides a secure foundation for user login, sign-up, and email verification using **JWT-based authentication and authorization**.

> 🚀 Moto: *Providing secure user login with authentication and authorization.*

---

## ⚙️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Email Verification**: Secure link-based verification

---

## ✨ Features

- 🔐 Secure user **Sign Up** and **Login**
- ✅ **Email Verification** with token validation
- 🛡️ **Authorization** middleware for protected routes
- 📦 Modular and clean code structure
- 🔍 Input validation and basic error handling


---

## 📁 Basic Project Structure

```bash
.
├── app/                   # Next.js App Router pages
├── lib/                   # Utility functions (e.g. token handling, db connect)
├── models/                # Mongoose models
├── api/                   # API route handlers
├── middleware/            # Auth & validation middlewares
├── types/                 # TypeScript types and interfaces
└── .env.local             # Environment variables
```

---

## 🔑 Environment Variables

Create a `.env.local` file and add the following:

```env
# MongoDB Connection URI 
MONGODB_URI=<Your Credential>

JWT_SECRET=<Your Credential>

SMTP_USER=<Your Credential>
SMTP_PASS=<Your Credential>

DOMAIN=http://localhost:3000  

```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/NajibHossain49/nextsecure.git
cd nextsecure

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your own values

# 4. Run the development server
npm run dev
```

Visit `http://localhost:3000` to see it in action.

---

## 🔧 Available Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production


---

## 🔐 Authentication Flow

1. **Sign Up**: User registers → Email verification link is sent.
2. **Email Verification**: User clicks link → Account gets verified.
3. **Login**: Credentials are checked → JWT tokens are issued.
4. **Authorization**: Protected API routes only accessible with valid token.

---

## 🧱 Future Improvements

- Forgot password / reset password flow
- Rate limiting and brute force protection
- OAuth provider support (Google, GitHub, etc.)
- 2FA (Two-Factor Authentication)
- Dashboard and user profile management

---

## 🧑‍💻 Author

Developed with ❤️ by **Najib Hossain**  
[GitHub](https://github.com/NajibHossain49) | [LinkedIn](https://www.linkedin.com/in/md-najib-hossain)

## 🌟 Show Your Support

If you like this project, please ⭐ the repository and share it with others!