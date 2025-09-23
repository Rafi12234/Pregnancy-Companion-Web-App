import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import MotherData from '../models/MotherData.js';

const router = Router();

/**
 * GET /api/dashboard/data
 * Returns the saved dashboard for the logged-in user.
 * Shape:
 * {
 *   healthData: { weight:[], bloodPressure:[], heartRate:[] },
 *   babyData:   { weight:[], kicks:[], movement:[] }
 * }
 */
router.get('/data', auth, async (req, res) => {
  try {
    const doc = await MotherData.findOne({ user: req.userId });
    const dashboard = doc?.dashboard || {
      healthData: { weight: [], bloodPressure: [], heartRate: [] },
      babyData: { weight: [], kicks: [], movement: [] }
    };
    return res.json({ data: dashboard });
  } catch (err) {
    console.error('GET /api/dashboard/data error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/dashboard/data
 * Saves the FULL dashboard exactly as sent by the frontend (replace mode).
 * The frontend should send:
 * { "dashboard": { "healthData": {...}, "babyData": {...} } }
 */
router.post('/data', auth, async (req, res) => {
  try {
    const incoming = req.body?.dashboard || {};

    // Normalize to avoid undefined arrays on first save
    const normalized = {
      healthData: {
        weight: incoming?.healthData?.weight || [],
        bloodPressure: incoming?.healthData?.bloodPressure || [],
        heartRate: incoming?.healthData?.heartRate || []
      },
      babyData: {
        weight: incoming?.babyData?.weight || [],
        kicks: incoming?.babyData?.kicks || [],
        movement: incoming?.babyData?.movement || []
      }
    };

    const updated = await MotherData.findOneAndUpdate(
      { user: req.userId },
      { dashboard: normalized },
      { new: true, upsert: true }
    );

    // Return the saved dashboard back to the client
    return res.json({ message: 'Data saved', data: updated.dashboard });
  } catch (err) {
    console.error('POST /api/dashboard/data error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/dashboard/reset
 * Clears all arrays so the user can start fresh.
 */
router.post('/reset', auth, async (req, res) => {
  try {
    const cleared = {
      healthData: { weight: [], bloodPressure: [], heartRate: [] },
      babyData: { weight: [], kicks: [], movement: [] }
    };

    const updated = await MotherData.findOneAndUpdate(
      { user: req.userId },
      { dashboard: cleared },
      { new: true, upsert: true }
    );

    return res.json({ message: 'Dashboard reset', data: updated.dashboard });
  } catch (err) {
    console.error('POST /api/dashboard/reset error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
