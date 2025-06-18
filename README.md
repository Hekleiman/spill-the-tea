# 🍃 Spill the Tea

A full-stack tea community application built with **React**, **Express**, and **MongoDB**.

## 📁 Project Structure

```
spill-the-tea/
├── 📂 client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
├── 📂 server/              # Express Backend
│   ├── index.js           # Server entry point
│   ├── userController.js  # Authentication logic
│   ├── userModel.js       # User database model
│   ├── TeaController.js   # Tea CRUD operations
│   ├── TeaModel.js        # Tea database model
│   └── package.json       # Backend dependencies
│
├── package.json           # Root orchestration scripts
├── .gitignore            # Comprehensive ignore rules
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0
- **MongoDB** (running locally)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spill-the-tea
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start MongoDB** (if not already running)
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or manually
   mongod
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - **Frontend**: http://localhost:5173 (Vite dev server)
   - **Backend**: http://localhost:3000 (Express server)

## 📜 Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend concurrently
- `npm run client` - Start only the frontend development server  
- `npm run server` - Start only the backend development server
- `npm run build` - Build the frontend for production
- `npm run install:all` - Install dependencies for all packages
- `npm test` - Run tests for both frontend and backend

### Individual Package Commands
```bash
# Frontend (client/)
cd client
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build

# Backend (server/)
cd server  
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
```

## 🔧 Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling (custom CSS)

### Backend  
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Concurrently** - Run multiple commands
- **Nodemon** - Auto-restart server
- **ESLint** - Code linting

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login with email/username and password

### Tea Management
- `GET /api/teas` - Get all teas
- `POST /api/teas` - Create new tea entry
- `PATCH /api/teas/:id` - Update tea entry
- `DELETE /api/teas/:id` - Delete tea entry

### System
- `GET /api/health` - Health check and database status

## 🗄️ Database Configuration

The application connects to a local MongoDB instance:
- **Database**: `spill-the-tea`
- **Connection**: `mongodb://localhost:27017/spill-the-tea`

### Collections
- `users` - User accounts and authentication
- `teas` - Tea entries and community posts

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages (no sensitive data exposure)
- **Database Connection**: Graceful handling of connection issues

## 🎯 Development Principles

This project follows **SOLID principles** and best practices:

- **Single Responsibility**: Each component/controller has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code  
- **Liskov Substitution**: Components are interchangeable
- **Interface Segregation**: Clean, minimal interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

### Code Standards
- **KISS** (Keep It Simple, Stupid)
- **DRY** (Don't Repeat Yourself)
- **YAGNI** (You Aren't Gonna Need It)
- **Performance Optimization**: Efficient queries and minimal re-renders

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Start MongoDB
   brew services start mongodb-community
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process on port 5173  
   lsof -ti:5173 | xargs kill -9
   ```

3. **Dependencies Issues**
   ```bash
   # Clean install
   rm -rf node_modules client/node_modules server/node_modules
   npm run install:all
   ```

## 📝 Contributing

1. Follow the existing code style and structure
2. Write meaningful commit messages
3. Test your changes before committing
4. Update documentation as needed

## 📄 License

MIT License - See LICENSE file for details