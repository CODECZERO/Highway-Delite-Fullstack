# BookIt: Travel Experiences Booking Platform

A full-stack web application for discovering and booking travel experiences. Built with React, TypeScript, Node.js, Express, and MongoDB.

## 🌟 Features

- **Browse Experiences**: Explore curated travel experiences with detailed information
- **Real-time Availability**: Check slot availability and book instantly
- **Promo Codes**: Apply discount codes for special offers
- **Responsive Design**: Fully responsive UI built with TailwindCSS
- **Booking Management**: Complete booking flow from selection to confirmation
- **Transaction Safety**: MongoDB transactions prevent double-booking

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Helmet** for security
- **Morgan** for logging

## 📁 Project Structure

```
Project1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── models/
│   │   │   ├── Experience.ts
│   │   │   ├── Booking.ts
│   │   │   └── PromoCode.ts
│   │   ├── controllers/
│   │   │   ├── experienceController.ts
│   │   │   ├── bookingController.ts
│   │   │   └── promoController.ts
│   │   ├── routes/
│   │   │   ├── experienceRoutes.ts
│   │   │   ├── bookingRoutes.ts
│   │   │   └── promoRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DetailsPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   └── ResultPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Project1
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/bookit
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

3. **Frontend Setup**
```bash
cd ../frontend
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID with slots

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

### Available Promo Codes
- `SAVE10` - 10% off (min ₹1000, max ₹500 discount)
- `FLAT100` - ₹100 off (min ₹500)
- `FIRST20` - 20% off (min ₹2000, max ₹1000 discount)
- `WELCOME` - ₹200 off (min ₹1500)

## 🎨 Features Implemented

### Frontend
✅ Responsive design with TailwindCSS  
✅ Clean, modern UI with consistent spacing  
✅ Loading states and error handling  
✅ Form validation  
✅ Promo code application  
✅ Real-time price calculation  
✅ Booking confirmation page  

### Backend
✅ RESTful API architecture  
✅ MongoDB with Mongoose ODM  
✅ Transaction support for bookings  
✅ Promo code validation  
✅ Double-booking prevention  
✅ Error handling middleware  
✅ CORS and security headers  

## 🌐 Deployment

### Backend Deployment (Render/Railway)

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CORS_ORIGIN=<your-frontend-url>`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Create a new project
2. Connect your GitHub repository
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variable:
   - `VITE_API_URL=<your-backend-url>`
5. Deploy

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for development)
4. Get your connection string
5. Update `MONGODB_URI` in your environment variables



## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookit
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built as a fullstack intern assignment project.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- UI inspiration from modern booking platforms
# Highway-Delite-Fullstack
