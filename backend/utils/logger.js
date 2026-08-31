import Log from '../models/Log.js';

export const createLog = async (action, category, description, meta = {}, performedBy = 'System') => {
  try {
    await Log.create({ action, category, description, meta, performedBy });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Log error:', err.message);
    }
  }
};

export const logger = {
  info: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, ...args);
    }
  },
  error: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(message, ...args);
    }
  },
  warn: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message, ...args);
    }
  }
};
