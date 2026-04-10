import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

const existingAdmin = await User.findOne({ email: 'admin@leelahospital.com' });
    if (existingAdmin) {
      console.log('Superadmin already exists:', existingAdmin.email);
      process.exit(0);
    }

const superadmin = await User.create({
      name: 'Super Admin',
      email: 'admin@leelahospital.in',
      password: 'LeelaHospitals@Admin2026',
      role: 'superadmin',
      phone: '+91 9008371817',
      isActive: true
    });

    console.log('=================================');
    console.log('Superadmin created successfully!');
    console.log('=================================');
    console.log('Email: admin@leelahospital.com');
    console.log('Password: LeelaHospitals@Admin2026');
    console.log('=================================');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

if (process.argv[1].includes('seedAdmin.js')) {
  createSuperAdmin();
}

export default createSuperAdmin;
