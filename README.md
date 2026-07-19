# Car Rental

## Purpose
This is the frontend for the Car Rental application, built with React and Tailwind CSS. The application allows users to browse available cars, book cars, and manage their bookings.

## Backend

This frontend now points to [car-rental-backend](https://github.com/rakib-sikder/car-rental-backend) —
the original backend's source was never committed to any repo and its live deployment was
returning 500 errors, so a replacement implementing the same API surface was built. The base
URL lives in `src/api.js` (override via `VITE_API_BASE` if you deploy your own backend).

## Environment variables

Copy `.env.example` to `.env` and fill in your Firebase project's config (Firebase console →
Project settings → General → Your apps) for authentication to work:

```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
```

## Key Features

- **Responsive Design**: The application is fully responsive and works on mobile, tablet, and desktop devices.
- **Car Listings**: Users can view a list of available cars with details such as model, price, and availability.
- **Search and Filter**: Users can search for cars based on various criteria and sort the listings by price and date.
- **Booking Management**: Users can book cars and manage their bookings.
- **Special Offers**: The application displays special offers and discounts on car rentals.
- **Newsletter Subscription**: Users can subscribe to the newsletter to receive the latest updates.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API requests.
- **Framer Motion**: A library for animations and gestures in React.
- **DaisyUI**: A plugin for Tailwind CSS that provides pre-designed components.

## Getting started

```bash
npm install
cp .env.example .env   # add your Firebase config
npm run dev
```
