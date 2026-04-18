import express from 'express';
import Log from '../models/Log.js';
import { protect, superadminOnly } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.get('/', protect, superadminOnly, async (req, res) => {
  try {
    const { category, limit = 100 } = req.query;
    const query = category ? { category } : {};
    const logs = await Log.find(query).sort({ createdAt: -1 }).limit(Number(limit));
    res.json({ success: true, count: logs.length, logs });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
