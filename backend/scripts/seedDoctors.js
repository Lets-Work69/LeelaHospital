import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Doctor from '../models/Doctor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const doctors = [
  { name: 'Dr. Vishwas Bugati',      specialty: 'Obstetrician & Gynocologist', experience: '15 Yrs', rating: '4.8', patients: '2.8K', profileImage: '/doctors/doctor1.webp' },
  { name: 'Dr. Praveen Dambal',      specialty: 'Urosurgeon & Andrologist',    experience: '12 Yrs', rating: '4.9', patients: '4.1K', profileImage: '/doctors/doctor2.webp' },
  { name: 'Dr. Sarvesh Khakandaki',  specialty: 'Orthopaedic Surgeon',         experience: '20 Yrs', rating: '4.7', patients: '2.5K', profileImage: '/doctors/doctor3.webp' },
  { name: 'Dr. Vinayak Kurudagi',    specialty: 'ENT Specialist',              experience: '14 Yrs', rating: '4.8', patients: '3.0K', profileImage: '/doctors/doctor4.webp' },
  { name: 'Dr. Timmaraddi Hosamani', specialty: 'Pediatrics',                  experience: '16 Yrs', rating: '4.7', patients: '2.2K', profileImage: '/doctors/doctor5.webp' },
  { name: 'Dr. Soumya Dambal',       specialty: 'Ophthalmologist',             experience: '10 Yrs', rating: '4.9', patients: '3.8K', profileImage: '/doctors/doctor6.webp' },
  { name: 'Dr. Saroja Patil',        specialty: 'Dermatologist',               experience: '18 Yrs', rating: '4.6', patients: '1.9K', profileImage: '/doctors/doctor7.webp' },
  { name: 'Dr. Vinay Teradal',       specialty: 'General Surgeon',             experience: '13 Yrs', rating: '4.8', patients: '2.7K', profileImage: '/doctors/doctor8.webp' },
  { name: 'Dr. Vijaya Kattimani',    specialty: 'Pediatrics',                  experience: '11 Yrs', rating: '4.7', patients: '2.1K', profileImage: '/doctors/doctor9.webp' },
  { name: 'Dr. Anitha P Dharana',    specialty: 'Obstetrician & Gynocologist', experience: '9 Yrs',  rating: '4.8', patients: '1.8K', profileImage: '/doctors/dc10.webp' },
  { name: 'Dr. Basavaraj Yanagi',    specialty: 'General Physician',           experience: '17 Yrs', rating: '4.7', patients: '2.0K', profileImage: '/doctors/11.webp' },
  { name: 'Dr. Tippanna Nagar',      specialty: 'General Physician',           experience: '17 Yrs', rating: '4.7', patients: '2.0K', profileImage: '/doctors/12.webp' },
];

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    let seeded = 0;
    for (const d of doctors) {
      const exists = await Doctor.findOne({ name: d.name.trim() });
      if (!exists) {
        await Doctor.create({ ...d, isActive: true });
        console.log(` ✅ Added: ${d.name}`);
        seeded++;
      } else {
        console.log(` ⏭  Skipped (exists): ${d.name}`);
      }
    }

    console.log(`\nDone. ${seeded} new doctors added.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seed();
