import { Router } from 'express';
import Appointment from '../models/Appointment.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// GET /api/appointments  -> list current user's appointments
router.get('/', auth, async (req, res) => {
  try {
    const docs = await Appointment.find({ user: req.userId }).sort({ date: 1, time: 1 });
    res.json({ data: docs });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/appointments -> create one
router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await Appointment.create({ ...payload, user: req.userId });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(400).json({ message: 'Invalid appointment payload' });
  }
});

// PUT /api/appointments/:id -> update (reschedule, edit)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body || {};
    const doc = await Appointment.findOneAndUpdate(
      { _id: id, user: req.userId },
      update,
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ data: doc });
  } catch (e) {
    res.status(400).json({ message: 'Invalid update' });
  }
});

// PATCH /api/appointments/:id/toggle -> toggle completed
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Appointment.findOne({ _id: id, user: req.userId });
    if (!doc) return res.status(404).json({ message: 'Appointment not found' });
    doc.completed = !doc.completed;
    await doc.save();
    res.json({ data: doc });
  } catch (e) {
    res.status(400).json({ message: 'Invalid request' });
  }
});

// DELETE /api/appointments/:id -> delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Appointment.findOneAndDelete({ _id: id, user: req.userId });
    if (!doc) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Invalid request' });
  }
});

export default router;
