import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createSuperAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(uri);
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
