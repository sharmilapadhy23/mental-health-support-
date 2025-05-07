
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Register auth routes
app.use('/api/auth', require('./routes/authRoutes'));
// Register protected mood routes
app.use('/api/mood', require('./routes/moodRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/', (req, res) => {
    res.send('Mental Health Support API is running');
  });
app.use('/api/doctors', require('./routes/doctorRoutes'));