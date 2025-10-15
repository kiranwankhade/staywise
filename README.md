# 🏨 StayWise - Luxury Property Booking Platform

A full-stack application for browsing and booking luxury rental properties, featuring user authentication, role-based access control (Admin/User), and a seamless booking experience.

## ✨ Features

* **Role-Based Access Control:** Separate features for Admin (property management, view all bookings) and standard Users (booking, viewing personal history).
* **Property Listings:** View, filter, and add detailed property listings.
* **Secure Authentication:** User signup and login handled with JWT.
* **Date Picker Integration:** Easy booking with date selection limited to today and future dates.
* **Modern Frontend:** Built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React Hook Form/Zod** for robust client-side architecture.

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **State Management:** React Context (for Auth)
* **Form Handling:** React Hook Form + Zod
* **Date Picker:** react-datepicker

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **API Client (Frontend):** Axios

## 🚀 Getting Started

To run this project locally, you need to set up both the backend API and the Next.js frontend application.

### Prerequisites

* Node.js (v18+)
* MongoDB Instance (Local or Atlas)

### 1. Backend Setup

The backend API handles authentication, property data, and bookings.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a file named `.env` in the `backend` directory and add your environment variables:
    ```env
    PORT=5000
    MONGO_URI="mongodb+srv://<user>:<password>@<cluster-name>/staywise?retryWrites=true&w=majority"
    JWT_SECRET="YOUR_VERY_SECRET_KEY_HERE"
    ```
4.  Start the backend server:
    ```bash
    npm start
    # or
    npm run dev  # if using a development script like nodemon
    ```

The API should now be running at `http://localhost:5000`.

---

### 2. Frontend Setup

The frontend is the Next.js application that consumes the backend API.

1.  Navigate to the frontend directory:
    ```bash
    cd frontend 
    # (Assuming your Next.js folder is named 'frontend' or similar)
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a file named `.env.local` in the **root of the frontend folder** and add the API URL:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```
4.  Start the Next.js development server:
    ```bash
    npm run dev
    ```

The frontend application should now be available at `http://localhost:3000`.

## 🔑 Key Endpoints

| Component | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/auth/signup` | `POST` | Register a new user. |
| **Auth** | `/auth/login` | `POST` | Authenticate and receive JWT + user data. |
| **Properties** | `/properties` | `GET` | Fetch all properties. |
| **Properties** | `/properties` | `POST` | Add a new property (Admin only). |
| **Bookings** | `/bookings` | `POST` | Create a new booking (User required). |
| **Bookings** | `/bookings` | `GET` | View bookings (Admin: All, User: Personal). |

## 🔗 Deployed Links
You can access the live application here:

| Component | URL | Hosting Platform |
| :--- | :--- | :--- |
| **Frontend App** | [https://staywise-frontend.vercel.app/](https://staywise-frontend.vercel.app/) | Vercel |
| **Backend API** | [https://staywise-one.vercel.app/](https://staywise-one.vercel.app/) | Render/Other |
