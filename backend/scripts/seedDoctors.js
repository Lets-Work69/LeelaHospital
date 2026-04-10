import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';

dotenv.config();

const doctors = [
  { name: 'Dr. Vishwas Bugati',      specialty: 'Obstetrician & Gynocologist', experience: '15 Yrs', rating: '4.8', patients: '2.8K' },
  { name: 'Dr. Praveen Dambal',      specialty: 'Urosurgeon & Andrologist',    experience: '12 Yrs', rating: '4.9', patients: '4.1K' },
  { name: 'Dr. Sarvesh Khakandaki',  specialty: 'Orthopaedic Surgeon',         experience: '20 Yrs', rating: '4.7', patients: '2.5K' },
  { name: 'Dr. Vinayak Kurudagi',    specialty: 'ENT Specialist',              experience: '14 Yrs', rating: '4.8', patients: '3.0K' },
  { name: 'Dr. Timmaraddi Hosamani', specialty: 'Pediatrics',                  experience: '16 Yrs', rating: '4.7', patients: '2.2K' },
  { name: 'Dr. Soumya Dambal',       specialty: 'Ophthalmologist',             experience: '10 Yrs', rating: '4.9', patients: '3.8K' },
  { name: 'Dr. Saroja Patil',        specialty: 'Dermatologist',               experience: '18 Yrs', rating: '4.6', patients: '1.9K' },
  { name: 'Dr. Vinay Teradal',       specialty: 'General Surgeon',             experience: '13 Yrs', rating: '4.8', patients: '2.7K' },
  { name: 'Dr. Vijaya Kattimani',    specialty: 'Pediatrics',                  experience: '11 Yrs', rating: '4.7', patients: '2.1K' },
  { name: 'Dr. Anitha P Dharana',    specialty: 'Obstetrician & Gynocologist', experience: '9 Yrs',  rating: '4.8', patients: '1.8K' },
  { name: 'Dr. Basavaraj Yanagi',    specialty: 'General Physician',           experience: '17 Yrs', rating: '4.7', patients: '2.0K' },
  { name: 'Dr. Tippanna Nagar',      specialty: 'General Physician',           experience: '17 Yrs', rating: '4.7', patients: '2.0K' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Insert only doctors that don't already exist by name
    let seeded = 0;
    for (const d of doctors) {
      const exists = await Doctor.findOne({ name: d.name.trim() });
      if (!exists) {
        await Doctor.create({ ...d, profileImage: '', isActive: true });
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
