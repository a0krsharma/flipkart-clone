# FlipShop E-Commerce Website

A full-fledged e-commerce website built with React, similar to Flipkart, featuring product listings, shopping cart, checkout process, and admin dashboard.

## Features

- **Product Browsing**: Browse products by category (Electronics, Fashion, Books), search, and filter by price
- **Product Details**: View detailed product information, specifications, and reviews
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **User Authentication**: Register, login, and manage user profile
- **Admin Dashboard**: Manage products and orders (for admin users)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Demo

Visit the live demo at: [FlipShop Demo](http://localhost:5174)

## Admin Login

Use the following credentials to access the admin dashboard:

- **Email**: admin@flipshop.com
- **Password**: admin123

## Contact Us

For any inquiries or support, please contact us:

- **Email**: a0krsharma@gmail.com
- **Phone**: +91 7070253050
- **Address**: Chandi, Bihar 803108

## Product Categories

The website features products in the following categories:

1. **Electronics**
   - Smartphones, Laptops, TVs, Headphones, and more

2. **Fashion**
   - Men's Clothing
   - Women's Clothing
   - Footwear
   - Accessories

3. **Books**
   - Fiction
   - Non-Fiction

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Material UI**: Component library for modern UI design
- **Firebase**: Authentication, database, and storage
- **Context API**: State management
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/flipshop.git
   cd flipshop
   ```

2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5174
   ```

## Project Structure

```
src/
├── assets/        # Static assets like images
├── components/    # Reusable UI components
│   ├── admin/     # Admin-specific components
│   ├── auth/      # Authentication components
│   ├── cart/      # Shopping cart components
│   ├── layout/    # Layout components (header, footer)
│   └── product/   # Product-related components
├── context/       # Context providers for state management
├── pages/         # Page components
└── services/      # API and service functions
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)
- [Unsplash](https://unsplash.com/) for demo product images
