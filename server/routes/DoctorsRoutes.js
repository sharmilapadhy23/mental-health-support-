const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all routes with authentication middleware
router.use(authMiddleware);

// @route   GET /api/doctors
// @desc    Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching doctors' });
  }
});

// @route   GET /api/doctors/:id
// @desc    Get single doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching doctor' });
  }
});

// @route   POST /api/doctors
// @desc    Create a new doctor
router.post('/', async (req, res) => {
  const { name, specialty, phone, email, image } = req.body;

  try {
    const newDoctor = new Doctor({ name, specialty, phone, email, image });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating doctor' });
  }
});

// @route   PUT /api/doctors/:id
// @desc    Update a doctor by ID
router.put('/:id', async (req, res) => {
  const { name, specialty, phone, email, image } = req.body;

  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.name = name || doctor.name;
    doctor.specialty = specialty || doctor.specialty;
    doctor.phone = phone || doctor.phone;
    doctor.email = email || doctor.email;
    doctor.image = image || doctor.image;

    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating doctor' });
  }
});

// @route   DELETE /api/doctors/:id
// @desc    Delete a doctor by ID
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    await doctor.remove();
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting doctor' });
  }
});

module.exports = router;
