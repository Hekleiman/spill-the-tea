
// middleware/userController.js
import User from '../userModel.js';

export const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }
    
    const newUser = new User({ username, password, email });
    await newUser.save();
    
    res.locals.message = 'User created successfully';
    res.locals.user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email
    };
    
    return next();
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.locals.message = 'Login successful';
    res.locals.user = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    return next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};