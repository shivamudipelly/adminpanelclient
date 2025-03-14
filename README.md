# Round-Robin Coupon Distribution with Admin Panel

## 📌 Project Overview
This web application distributes coupons to guest users in a round-robin manner while providing an admin panel for managing coupons and preventing abuse.

## 🌐 Live Deployment
- **Live URL:** [https://adminpanelclient-t5rz.vercel.app](https://adminpanelclient-t5rz.vercel.app/)
- **Admin Credentials:**  
  - **Email:** shivamudipally12@gmail.com  
  - **Password:** Shiva@701  

## 🚀 Features
### **User Side (Guest Users)**
- Claim a coupon without logging in.
- Coupons are assigned sequentially without repetition.
- Abuse prevention mechanisms:
  - **IP Tracking:** Prevents multiple claims from the same IP within a cooldown period.
  - **Cookie-Based Tracking:** Restricts claims from the same browser session.
- Displays messages for successful claims or restriction warnings.

### **Admin Panel**
- **Secure Login:** Only authorized admins can access the panel.
- **Manage Coupons:** View, add, update, and delete coupons.
- **User Claim History:** View details of users (IP/browser session) who claimed coupons.
- **Toggle Coupon Availability:** Enable/disable specific coupons dynamically.

## 🛠️ Tech Stack
- **Frontend:** React.js,  TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT for admin login
- **Deployment:** Hosted on Vercel

## 🔧 Setup Instructions
### **Prerequisites**
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (local or cloud)
- Git

### **Installation Steps**
1. **Clone the Repositories**
   ```bash
   git clone https://github.com/shivamudipelly/adminpanelclient.git
   git clone https://github.com/shivamudipelly/adminpanel.git
   ```
2. **Install Dependencies**
   ```bash
   cd adminpanelclient
   npm install
   cd ../adminpanel
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory of `adminpanel` and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   COOKIE_EXPIRY=86400
   ```
4. **Run the Application**
   - Start the backend server:
     ```bash
     cd adminpanel
     npm run server
     ```
   - Start the frontend:
     ```bash
     cd adminpanelclient
     npm start
     ```
5. **Access the Application**
   - Open `https://adminpanelclient-t5rz.vercel.app/admin/users` in the browser.
   - Admin panel available at `/admin`.

## 🔒 Security Measures
- Admin authentication with JWT.
- Rate limiting to prevent multiple coupon claims.
- Secure API endpoints to avoid unauthorized access.

## 📄 Documentation
For detailed API endpoints and request formats, refer to the [API Documentation](#).

## 📝 License
This project is for educational purposes and not intended for commercial use.

---
### 📧 Contact
For queries, reach out at shivamudipally12@gmail.com.

