import mongoose from 'mongoose';

/**
 * One dashboard document per user:
 * {
 *   healthData: {
 *     weight: [{ week, value, date }],
 *     bloodPressure: [{ date, systolic, diastolic }],
 *     heartRate: [{ date, rate }]
 *   },
 *   babyData: {
 *     weight: [{ week, value }],
 *     kicks: [{ date, count }],
 *     movement: [{ date, level }]
 *   }
 * }
 */
const motherDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dashboard: { type: Object, default: {} }
  },
  { timestamps: true }
);

const MotherData = mongoose.model('MotherData', motherDataSchema);
export default MotherData;
