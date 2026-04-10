import express from 'express';
import { body, validationResult } from 'express-validator';
import Doctor from '../models/Doctor.js';
import { protect, superadminOnly } from '../middleware/auth.js';
import { createLog } from '../utils/logger.js';

const router = express.Router();

// @route   POST /api/doctors/reorder
// @desc    Save new sort order
// @access  Private/Superadmin
router.post('/reorder', protect, superadminOnly, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    await Promise.all(
      orderedIds.map((id, index) =>
        Doctor.findByIdAndUpdate(id, { sortOrder: index })
      )
    );
    await createLog('DOCTORS_REORDERED', 'doctor', 'Doctor order updated', {}, req.user?.name);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors
// @desc    Get all active doctors (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/doctors/all
// @desc    Get all doctors including inactive (superadmin only)
// @access  Private/Superadmin
router.get('/all', protect, superadminOnly, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/doctors
// @desc    Add new doctor
// @access  Private/Superadmin
router.post('/', protect, superadminOnly, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('specialty').trim().notEmpty().withMessage('Specialty is required'),
  body('experience').trim().notEmpty().withMessage('Experience is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, specialty, experience, patients, rating, profileImage } = req.body;

    const doctor = await Doctor.create({
      name,
      specialty,
      experience,
      patients: patients || '0',
      rating: rating || '4.5',
      profileImage: profileImage || '',
      isActive: true
    });

    res.status(201).json({ success: true, message: 'Doctor added successfully', doctor });
    await createLog('DOCTOR_ADDED', 'doctor', `Added doctor: ${doctor.name} (${doctor.specialty})`, { doctorId: doctor._id, name: doctor.name }, req.user?.name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/doctors/:id
// @desc    Update doctor
// @access  Private/Superadmin
router.put('/:id', protect, superadminOnly, async (req, res) => {
  try {
    const { name, specialty, experience, patients, rating, profileImage, isActive } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    if (name !== undefined) doctor.name = name;
    if (specialty !== undefined) doctor.specialty = specialty;
    if (experience !== undefined) doctor.experience = experience;
    if (patients !== undefined) doctor.patients = patients;
    if (rating !== undefined) doctor.rating = rating;
    if (profileImage !== undefined) doctor.profileImage = profileImage;
    if (isActive !== undefined) doctor.isActive = isActive;

    await doctor.save();
    res.json({ success: true, doctor });

    // Log the action
    if (isActive !== undefined) {
      await createLog(
        isActive ? 'DOCTOR_ACTIVATED' : 'DOCTOR_DEACTIVATED',
        'doctor',
        `${isActive ? 'Activated' : 'Deactivated'} doctor: ${doctor.name}`,
        { doctorId: doctor._id, name: doctor.name },
        req.user?.name
      );
    } else {
      await createLog('DOCTOR_EDITED', 'doctor', `Edited doctor: ${doctor.name}`, { doctorId: doctor._id, name: doctor.name }, req.user?.name);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/doctors/:id/permanent
// @desc    Permanently delete doctor
// @access  Private/Superadmin
router.delete('/:id/permanent', protect, superadminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await createLog('DOCTOR_DELETED', 'doctor', `Permanently deleted doctor: ${doctor.name}`, { name: doctor.name }, req.user?.name);
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', protect, superadminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.isActive = false;
    await doctor.save();

    res.json({ success: true, message: 'Doctor deactivated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
