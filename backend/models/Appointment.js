import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide patient name'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide patient phone'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Please provide appointment date']
  },
  message: {
    type: String,
    trim: true
  },
  consentGiven: {
    type: Boolean,
    required: [true, 'Consent is required'],
    default: false
  },
  consentTimestamp: {
    type: Date,
    required: [true, 'Consent timestamp is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
