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

// Connect Mongoose to MongoDB
mongoose
  .connect(
    'mongodb+srv://parkermasaru:p9N8FsKDw5nzsk7i@teacluster.t30wk3i.mongodb.net/?retryWrites=true&w=majority&appName=TeaCluster'
  )
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Start the server regardless of MongoDB connection status
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Spill the Tea');
});

// USER ROUTES
app.post('/api/signup', signup);
app.post('/api/login', login);

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