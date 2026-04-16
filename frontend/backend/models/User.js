import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['superadmin', 'doctor', 'receptionist'],
    default: 'doctor'
  },
  phone: {
    type: String,
    trim: true
  },
  specialty: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  qualifications: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  patients: {
    type: String,
    default: '0'
  },
  rating: {
    type: String,
    default: '4.5'
  },
  availability: {
    monday: { morning: Boolean, evening: Boolean },
    tuesday: { morning: Boolean, evening: Boolean },
    wednesday: { morning: Boolean, evening: Boolean },
    thursday: { morning: Boolean, evening: Boolean },
    friday: { morning: Boolean, evening: Boolean },
    saturday: { morning: Boolean, evening: Boolean },
    sunday: { morning: Boolean, evening: Boolean }
  },
  workingHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '17:00' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
