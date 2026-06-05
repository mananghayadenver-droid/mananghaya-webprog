const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isConfiguredAdmin = (email, password) =>
  String(email || '').trim().toLowerCase() ===
    String(process.env.ADMIN_EMAIL || '').trim().toLowerCase() &&
  String(password || '') === String(process.env.ADMIN_PASSWORD || '');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const email = String(req.body.email || '').trim().toLowerCase();
    const createAsAdmin = isConfiguredAdmin(email, req.body.password);

    if (createAsAdmin) {
      const existingAdmin = await User.findOne({ role: 'admin' });

      if (existingAdmin && String(existingAdmin.email).toLowerCase() !== email) {
        return res.status(409).json({ message: 'An admin account already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      email,
      role: createAsAdmin ? 'admin' : 'user',
      isActive: true,
      password: hashedPassword,
    });
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const payload = { ...req.body };
    delete payload.role;

    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingUser.role === 'admin' && payload.isActive === false) {
      return res.status(400).json({ message: 'The admin account cannot be disabled' });
    }

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
      select: '-password',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingUser.role === 'admin') {
      return res.status(400).json({ message: 'The admin account cannot be deleted' });
    }

    await existingUser.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const identifier = String(email || '').trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive. Please contact support.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (isConfiguredAdmin(user.email, password) && user.role !== 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });

      if (existingAdmin && !existingAdmin._id.equals(user._id)) {
        return res.status(409).json({ message: 'An admin account already exists' });
      }

      user.role = 'admin';
      await user.save();
    }

    const userType = user.role === 'admin' ? 'admin' : 'user';
    const token = jwt.sign(
      { id: user._id, email: user.email, type: userType },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      type: userType,
      firstName: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
