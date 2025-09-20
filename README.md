# 🔐 Product Supplier Management with Authentication

**Lab 5 Part 3** - A comprehensive web application with user authentication for managing suppliers and their products, built with Node.js, Express, MongoDB, and Mongoose following MVC architecture.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Authentication System](#authentication-system)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 User Authentication
- ✅ User registration with username, email, password, and phone
- ✅ Secure login with session management
- ✅ Password hashing using bcryptjs
- ✅ Session-based authentication with cookies
- ✅ Forgot password functionality
- ✅ User profile management
- ✅ Role-based access control (user/admin)

### 🏢 Supplier Management
- ✅ Create, read, update, delete suppliers
- ✅ Supplier information: name, address, phone
- ✅ Admin-only CRUD operations
- ✅ Supplier-product relationship management

### 📦 Product Management
- ✅ Create, read, update, delete products
- ✅ Product information: name, price, quantity, supplier reference
- ✅ Admin-only CRUD operations
- ✅ Product search and filtering

### 🔍 Search & Filter
- ✅ Search products by name
- ✅ Filter products by supplier
- ✅ Real-time search with AJAX
- ✅ Combined search and filter functionality

### 🎨 User Interface
- ✅ Responsive Bootstrap 5 design
- ✅ Modern and intuitive user interface
- ✅ Form validation with error messages
- ✅ Flash messages for user feedback
- ✅ Mobile-friendly design
- ✅ Role-based navigation
- ✅ Interactive JavaScript features
- ✅ Real-time search and filtering
- ✅ Smooth animations and transitions

### 🔧 Technical Features
- ✅ MVC architecture pattern
- ✅ MongoDB with Mongoose ODM
- ✅ Express sessions with MongoDB store
- ✅ Server-side validation using express-validator
- ✅ Error handling middleware
- ✅ RESTful API design
- ✅ Environment configuration

## 🛠 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: express-session, connect-mongo, bcryptjs
- **Frontend**: EJS templating, Bootstrap 5, JavaScript
- **Validation**: express-validator
- **Styling**: Bootstrap 5, Custom CSS
- **Icons**: Bootstrap Icons
- **JavaScript**: Interactive features, AJAX, animations
- **API**: RESTful endpoints for search and data
- **Development**: nodemon, dotenv

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lab5_part3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env file with your configuration
   NODE_ENV=development
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/product-supplier-auth-db
   SESSION_SECRET=your-super-secret-session-key-here
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGO_URI in .env file
   ```

5. **Run the application**
   ```bash
   # Option 1: Use the start script (recommended)
   ./start.sh
   
   # Option 2: Use npm run script
   npm run run
   
   # Option 3: Development mode
   npm run dev
   
   # Option 4: Production mode
   npm start
   
   # Option 5: Run directly
   node app.js
   
   # Option 6: Check if app is running
   npm run check
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3001`

## 🎯 First Time Setup

1. **Register the first admin user:**
   - Go to `http://localhost:3001/auth/register`
   - Create an account (this will be a regular user by default)
   - To make it an admin, you'll need to update the database directly or modify the User model

2. **Start using the application:**
   - Login with your credentials
   - Navigate to Suppliers or Products
   - Create, read, update, and delete records

## 🚀 JavaScript Features

### Interactive Enhancements
- **Real-time Search**: AJAX-powered search with debouncing
- **Dynamic Filtering**: Filter products by supplier without page reload
- **Form Validation**: Client-side validation with real-time feedback
- **Animations**: Smooth fade-in effects and hover animations
- **Auto-hide Alerts**: Success messages automatically disappear
- **Delete Confirmation**: JavaScript confirmation dialogs
- **Currency Formatting**: Automatic price formatting
- **Phone Formatting**: Input sanitization for phone numbers

### API Endpoints
- `GET /api/search` - AJAX search functionality
- `GET /api/suppliers` - Get all suppliers for dropdowns
- `GET /api/stats` - Application statistics

### Performance Features
- **Debounced Search**: 300ms delay for optimal performance
- **Result Limiting**: Maximum 50 search results
- **Efficient DOM Updates**: Minimal re-rendering
- **Memory Management**: Proper cleanup and optimization

## 📖 Usage

### Getting Started

1. **Home Page**: Browse products with search and filter functionality
2. **Registration**: Create a new user account
3. **Login**: Authenticate with username/email and password
4. **Admin Panel**: Full CRUD operations for suppliers and products (admin only)

### User Registration

1. Click "Register" in the navigation
2. Fill in the required fields:
   - Username (3-30 characters, alphanumeric + underscore)
   - Email (valid email format)
   - Password (minimum 6 characters)
   - Confirm Password
   - Phone Number
3. Click "Register"

### User Login

1. Click "Login" in the navigation
2. Enter username/email and password
3. Click "Login"

### Admin Operations

1. **Create Admin User**: Manually set role to 'admin' in database
2. **Manage Suppliers**: Add, edit, delete supplier information
3. **Manage Products**: Add, edit, delete product information
4. **User Management**: View and manage user accounts

### Search & Filter

1. **Search by Name**: Enter product name in search box
2. **Filter by Supplier**: Select supplier from dropdown
3. **Combined Search**: Use both search and filter together
4. **Clear Filters**: Click "Clear Filters" to reset

## 📁 Project Structure

```
lab5_part3/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
├── config/               # Configuration files
│   └── session.js        # Session configuration
├── models/               # Database models
│   ├── User.js           # User model with authentication
│   ├── Supplier.js       # Supplier model
│   └── Product.js        # Product model
├── controllers/          # Business logic
│   ├── authController.js # Authentication controller
│   ├── supplierController.js
│   └── productController.js
├── routes/               # Route definitions
│   ├── index.js          # Main routes with search
│   ├── auth.js           # Authentication routes
│   ├── suppliers.js      # Supplier routes
│   └── products.js       # Product routes
├── middleware/           # Custom middleware
│   └── auth.js           # Authentication middleware
├── views/                # EJS templates
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page with search
│   ├── login.ejs         # Login form
│   ├── register.ejs      # Registration form
│   ├── forgot.ejs        # Forgot password form
│   ├── profile.ejs       # User profile
│   ├── error.ejs         # Error page
│   ├── suppliers/        # Supplier views
│   └── products/         # Product views
└── public/               # Static assets
    ├── css/
    │   └── style.css     # Custom styles
    └── js/
        └── main.js       # Client-side JavaScript
```

## 🔐 Authentication System

### User Model
- **Username**: Unique identifier (3-30 chars, alphanumeric + underscore)
- **Email**: Unique email address
- **Password**: Hashed using bcryptjs (minimum 6 characters)
- **Phone**: Phone number with validation
- **Role**: 'user' or 'admin' (default: 'user')
- **isActive**: Account status (default: true)
- **lastLogin**: Timestamp of last login

### Session Management
- **Session Store**: MongoDB using connect-mongo
- **Session Duration**: 7 days
- **Security**: HttpOnly cookies, secure in production
- **Session Data**: userId, username, userEmail, userRole

### Middleware
- **isAuthenticated**: Requires login
- **isAdmin**: Requires admin role
- **isNotAuthenticated**: Redirects if already logged in
- **setUserLocals**: Sets user info for all views

## 🔌 API Endpoints

### Authentication
- `GET /auth/login` - Show login form
- `POST /auth/login` - Handle login
- `GET /auth/register` - Show registration form
- `POST /auth/register` - Handle registration
- `GET /auth/forgot` - Show forgot password form
- `POST /auth/forgot` - Handle forgot password
- `GET /auth/logout` - Handle logout
- `GET /auth/profile` - Show user profile
- `POST /auth/profile` - Update user profile

### Main Application
- `GET /` - Home page with search
- `GET /api/search` - AJAX search endpoint
- `GET /api/suppliers` - AJAX suppliers list

### Suppliers (Admin Only)
- `GET /suppliers` - List all suppliers
- `GET /suppliers/create` - Show create form
- `POST /suppliers/create` - Create new supplier
- `GET /suppliers/:id` - Show supplier details
- `GET /suppliers/:id/update` - Show edit form
- `POST /suppliers/:id/update` - Update supplier
- `GET /suppliers/:id/delete` - Show delete confirmation
- `POST /suppliers/:id/delete` - Delete supplier

### Products (Admin Only)
- `GET /products` - List all products
- `GET /products/create` - Show create form
- `POST /products/create` - Create new product
- `GET /products/:id` - Show product details
- `GET /products/:id/update` - Show edit form
- `POST /products/:id/update` - Update product
- `GET /products/:id/delete` - Show delete confirmation
- `POST /products/:id/delete` - Delete product

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  phone: String (required, phone format),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Supplier Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  address: String (required, max 200 chars),
  phone: String (required, phone format),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  price: Number (required, min 0),
  quantity: Number (required, min 0),
  supplier: ObjectId (required, ref: 'Supplier'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Key Features Implemented

### ✅ Requirements Met
- [x] Supplier information (name, address, phone)
- [x] Product information (name, price, quantity, supplier reference)
- [x] Homepage with supplier selection menu and product search
- [x] User information (username, password, email, phone)
- [x] Authentication with cookies and sessions
- [x] Registration, login, forgot password, logout pages
- [x] Admin section with full CRUD for products and suppliers
- [x] Login required for admin operations

### 🔧 Additional Features
- [x] Role-based access control
- [x] Real-time search with AJAX
- [x] Responsive design for mobile devices
- [x] Form validation with user feedback
- [x] Flash messages for user notifications
- [x] Error handling with custom error pages
- [x] Session management with MongoDB store
- [x] Password hashing and security
- [x] User profile management

## 🚀 Getting Started with Development

1. **Install dependencies**: `npm install`
2. **Set up environment**: Copy `.env.example` to `.env`
3. **Start MongoDB**: Ensure MongoDB is running
4. **Run in development**: `npm run dev`
5. **Access application**: `http://localhost:3001`

## 📝 Notes

- The application uses MongoDB for data persistence
- All forms include client-side and server-side validation
- The UI is fully responsive and works on mobile devices
- Error handling is implemented throughout the application
- The code follows MVC architecture principles
- Authentication is session-based with secure cookies
- Admin operations require authentication and admin role

## 👨‍💻 Author

**Tran Thi Thanh Thao**
- Lab 5 Part 3 - Service Oriented Programming

## 📄 License

This project is licensed under the ISC License.

---

**Lab 5 Part 3 - Service Oriented Programming Practice with Authentication**
