# 🚀 Quick Start Guide - Lab 5 Part 3

## ⚡ Quick Commands

### 1. Start MongoDB
```bash
mongod
```

### 2. Start the Application
```bash
# Choose one of these options:
./start.sh          # Recommended
npm run run         # Alternative
npm start           # Direct
node app.js         # Manual
```

### 3. Check if Running
```bash
npm run check
```

### 4. Access the Application
Open your browser: **http://localhost:3001**

## 🎯 First Steps

1. **Register Account**: Go to `/auth/register`
2. **Login**: Use your credentials at `/auth/login`
3. **Explore**: Navigate to Suppliers and Products
4. **CRUD**: Create, read, update, delete records

## 🔧 Troubleshooting

### MongoDB Issues
- **Port 27017 in use**: MongoDB is already running ✅
- **Connection failed**: Start MongoDB with `mongod`

### Application Issues
- **Port 3001 in use**: Change PORT in `.env` file
- **Module not found**: Run `npm install`
- **Database error**: Check MongoDB connection

### Common Commands
```bash
# Check MongoDB status
ps aux | grep mongod

# Check application status
ps aux | grep "node app.js"

# Kill processes if needed
pkill -f "node app.js"
pkill -f mongod
```

## 📱 Features Available

- ✅ User Authentication (Register/Login/Logout)
- ✅ Role-based Access Control
- ✅ Supplier CRUD Operations
- ✅ Product CRUD Operations
- ✅ Search & Filter Products
- ✅ Responsive Bootstrap UI
- ✅ Session Management
- ✅ Form Validation

## 🎨 UI Features

- **Home Page**: Product listing with search/filter
- **Navigation**: Role-based menu items
- **Forms**: Validation with error messages
- **Flash Messages**: Success/error feedback
- **Responsive**: Mobile-friendly design

## 🔐 Security Features

- **Password Hashing**: bcryptjs
- **Session Security**: Secure cookies
- **Route Protection**: Authentication middleware
- **Role Authorization**: Admin-only CRUD
- **Input Validation**: Server-side validation

---

**Ready to go!** 🎉
