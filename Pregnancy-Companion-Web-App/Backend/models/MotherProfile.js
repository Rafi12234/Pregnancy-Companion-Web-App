// Backend/models/MotherProfile.js
import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  relation: { type: String, default: '' },
  phone: { type: String, default: '' },
  altPhone: { type: String, default: '' },
}, { _id: false });

const MotherProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  mother: {
    fullName: { type: String, default: '' },
    dob: { type: String, default: '' },               // ISO date string
    bloodGroup: { type: String, default: '' },
    heightCm: { type: String, default: '' },
    prePregnancyWeightKg: { type: String, default: '' },
    currentWeightKg: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    occupation: { type: String, default: '' },
    medicalConditions: { type: String, default: '' },
    allergies: { type: String, default: '' },
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  pregnancy: {
    doctorName: { type: String, default: '' },
    clinicName: { type: String, default: '' },
    lmp: { type: String, default: '' },               // ISO date string
    edd: { type: String, default: '' },               // ISO date string
    gravida: { type: String, default: '' },
    para: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  husband: {
    fullName: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    occupation: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
  },
  emergencyContacts: { type: [EmergencyContactSchema], default: [] },
}, { timestamps: true });

const MotherProfile = mongoose.model('MotherProfile', MotherProfileSchema);
export default MotherProfile;
