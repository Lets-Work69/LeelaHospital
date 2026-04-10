import Log from '../models/Log.js';

export const createLog = async (action, category, description, meta = {}, performedBy = 'System') => {
  try {
    await Log.create({ action, category, description, meta, performedBy });
  } catch (err) {
    console.error('Log error:', err.message);
  }
};
