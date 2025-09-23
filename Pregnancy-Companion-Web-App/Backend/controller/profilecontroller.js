// Backend/controller/profileController.js
import MotherProfile from '../models/MotherProfile.js';

/**
 * GET /api/profile
 * Returns the logged-in mother's profile (or empty defaults).
 */
export const getMyProfile = async (req, res) => {
  try {
    const doc = await MotherProfile.findOne({ user: req.userId }).lean();
    if (!doc) {
      // return an empty skeleton so the UI has keys to bind
      return res.json({
        data: {
          mother: {
            fullName: '', dob: '', bloodGroup: '', heightCm: '',
            prePregnancyWeightKg: '', currentWeightKg: '',
            email: '', phone: '', occupation: '',
            medicalConditions: '', allergies: ''
          },
          address: { street: '', city: '', state: '', country: '', postalCode: '' },
          pregnancy: { doctorName: '', clinicName: '', lmp: '', edd: '', gravida: '', para: '', notes: '' },
          husband: { fullName: '', phone: '', email: '', occupation: '', bloodGroup: '' },
          emergencyContacts: [{ name: '', relation: '', phone: '', altPhone: '' }]
        }
      });
    }
    return res.json({ data: doc });
  } catch (err) {
    console.error('getMyProfile error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/profile
 * Upserts the mother's profile for the logged-in user.
 * Body: { mother, address, pregnancy, husband, emergencyContacts }
 */
export const upsertMyProfile = async (req, res) => {
  try {
    const payload = req.body || {};
    const normalized = {
      mother: payload.mother || {},
      address: payload.address || {},
      pregnancy: payload.pregnancy || {},
      husband: payload.husband || {},
      emergencyContacts: Array.isArray(payload.emergencyContacts) ? payload.emergencyContacts : []
    };

    const updated = await MotherProfile.findOneAndUpdate(
      { user: req.userId },
      { user: req.userId, ...normalized },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return res.json({ message: 'Profile saved', data: updated });
  } catch (err) {
    console.error('upsertMyProfile error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
