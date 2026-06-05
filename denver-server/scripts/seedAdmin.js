require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const seedAdmin = async () => {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  await mongoose.connect(process.env.MONGO_URI, { autoIndex: false });

  const existingAdmin = await User.findOne({ role: 'admin' });
  const existingEmail = await User.findOne({ email });

  if (existingAdmin && String(existingAdmin.email).toLowerCase() !== email) {
    throw new Error(`An admin already exists with email ${existingAdmin.email}`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = existingEmail || new User();

  Object.assign(admin, {
    firstName: 'Denver',
    lastName: 'Mananghaya',
    age: '21',
    gender: 'male',
    contactNumber: '09171234567',
    email,
    role: 'admin',
    username: 'mananghaya_admin',
    password: hashedPassword,
    address: 'Manila, Philippines',
    isActive: true,
  });

  await admin.save();
  console.log(`Admin ready: ${admin.email}`);
  await mongoose.disconnect();
};

seedAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
