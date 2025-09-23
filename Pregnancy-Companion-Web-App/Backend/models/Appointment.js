import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },     // YYYY-MM-DD
    time: { type: String, required: true },     // HH:MM (24h) or “10:00 AM”
    type: { type: String, enum: ['prenatal', 'baby', 'wellness'], default: 'prenatal' },
    status: { type: String, enum: ['upcoming', 'past'], default: 'upcoming' },
    notes: { type: String, default: '' },
    checklist: { type: [String], default: [] },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// recompute status based on date
function computeStatus(isoDate) {
  try {
    if (!isoDate) return 'upcoming';
    const today = new Date();
    const todayOnly = new Date(today.toISOString().slice(0, 10));
    const d = new Date(isoDate);
    return d < todayOnly ? 'past' : 'upcoming';
  } catch {
    return 'upcoming';
  }
}

AppointmentSchema.pre('save', function (next) {
  this.status = computeStatus(this.date);
  next();
});

AppointmentSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() || {};
  if (update.date) {
    update.status = computeStatus(update.date);
    this.setUpdate(update);
  }
  next();
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
