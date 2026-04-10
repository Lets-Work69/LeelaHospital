import express from 'express';
import { body, validationResult } from 'express-validator';
import Appointment from '../models/Appointment.js';
import { protect, superadminOnly } from '../middleware/auth.js';
import { createLog } from '../utils/logger.js';

const router = express.Router();

// SSE clients reference (set from server.js)
let sseClients = new Set();
export const setSSEClients = (clients) => { sseClients = clients; };

const broadcastNewAppointment = (appointment) => {
  const data = JSON.stringify({
    name: appointment.name,
    phone: appointment.phone,
    department: appointment.department,
    date: appointment.date
  });
  sseClients.forEach(client => {
    client.write(`event: new-appointment\ndata: ${data}\n\n`);
  });
};

// @route   POST /api/appointments
// @desc    Book an appointment (public)
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('date').notEmpty().withMessage('Date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, department, date, message } = req.body;

    const appointment = await Appointment.create({ name, phone, department, date, message });

    broadcastNewAppointment(appointment);
    await createLog('APPOINTMENT_BOOKED', 'appointment', `New appointment booked by ${appointment.name} for ${appointment.department} on ${appointment.date}`, { appointmentId: appointment._id, name: appointment.name, department: appointment.department }, appointment.name);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/appointments
// @desc    Get all appointments (superadmin only)
// @access  Private/Superadmin
router.get('/', protect, superadminOnly, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment status (superadmin only)
// @access  Private/Superadmin
router.put('/:id', protect, superadminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    await createLog('APPOINTMENT_STATUS_CHANGED', 'appointment', `Appointment status changed to "${status}" for ${appointment.name} (${appointment.department})`, { appointmentId: appointment._id, name: appointment.name, status }, req.user?.name);
    res.json({ success: true, appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment (superadmin only)
// @access  Private/Superadmin
router.delete('/:id', protect, superadminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    await createLog('APPOINTMENT_DELETED', 'appointment', `Deleted appointment for ${appointment.name} (${appointment.department})`, { name: appointment.name }, req.user?.name);
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
