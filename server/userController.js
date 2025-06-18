// middleware/userController.js
import User from './userModel.js';

// Database connection check
const checkDBConnection = () => {
  if (!User.db?.readyState || User.db.readyState !== 1) {
    throw new Error('Database not connected');
  }
};

export const signup = async (req, res, next) => {
  try {
    // Check database connection first
    checkDBConnection();

    const { username, password, email } = req.body;

    // Input validation
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: 'Username, password, and email are required' 
        });
    }

    // Password strength validation (best practice)
    if (password.length < 6) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: 'Password must be at least 6 characters long' 
        });
    }

    // Create and save user (password hashing handled by model)
    const newUser = new User({ username, password, email });
    await newUser.save();

    // Send success response (consistent with frontend expectations)
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token: `temp_token_${newUser._id}` // Placeholder token (replace with JWT later)
    });
  } catch (err) {
    // Handle database connection error
    if (err.message === 'Database not connected') {
      return res.status(503).json({ 
        success: false,
        message: 'Database service unavailable. Please try again later.' 
      });
    }

    // Handle duplicate key error (MongoDB constraint violation)
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ 
          success: false, 
          message: 'Username or email already exists' 
        });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }
    
    // Log error for debugging (security best practice)
    console.error('Signup error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const login = async (req, res, next) => {
  try {
    // Check database connection first
    checkDBConnection();

    const { username, email, password } = req.body;

    // Input validation - accept either username OR email
    const loginIdentifier = username || email;
    if (!loginIdentifier || !password) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: 'Email or username and password are required' 
        });
    }

    // Find user by username OR email (flexible login)
    const query = username ? { username } : { email };
    const user = await User.findOne(query);
    
    // Validate credentials (secure comparison)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Send success response (consistent with frontend expectations)
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: `temp_token_${user._id}` // Placeholder token (replace with JWT later)
    });
  } catch (err) {
    // Handle database connection error
    if (err.message === 'Database not connected') {
      return res.status(503).json({ 
        success: false,
        message: 'Database service unavailable. Please try again later.' 
      });
    }

    // Log error for debugging (security best practice)
    console.error('Login error:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};