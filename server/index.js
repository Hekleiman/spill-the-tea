// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createTea, getTeas, deleteTea, updateTea } from './TeaController.js';
import { signup, login } from './userController.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection - LOCAL ONLY
const connectDB = async () => {
  try {
    // Simple connection options that work with local MongoDB
    const mongoOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    };

    // Local MongoDB only - no Atlas
    const mongoURI = 'mongodb://localhost:27017/spill-the-tea';

    await mongoose.connect(mongoURI, mongoOptions);
    console.log('✅ Connected to Local MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 Solution: Make sure MongoDB is running locally');
    console.error('   • Run: brew services start mongodb-community');
    console.error('   • Or run: mongod');
    
    // Don't exit the process, let the app run without DB for now
    console.log('⚠️  Server will continue without database connection');
  }
};

// Connect to MongoDB
connectDB();

// Start the server regardless of MongoDB connection status
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Spill the Tea');
});

// Health check route
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'Server is running',
    database: dbStatus,
    mongoURI: 'mongodb://localhost:27017/spill-the-tea',
    timestamp: new Date().toISOString()
  });
});

// USER ROUTES (Auth endpoints)
app.post('/api/auth/signup', signup);
app.post('/api/auth/login', login);

// TEA ROUTES
app.get('/api/teas', getTeas);
app.post('/api/teas', createTea);
app.delete('/api/teas/:id', deleteTea);
app.patch('/api/teas/:id', updateTea);

// Error handling middleware
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});