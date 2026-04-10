import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,

},
  category: {
    type: String,
    enum: ['doctor', 'appointment'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  performedBy: {
    type: String,
    default: 'System'
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);
export default Log;
