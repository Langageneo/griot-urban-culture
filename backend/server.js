require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const youtubeRoutes = require('./routes/youtube');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB:', err));

// Routes
app.use('/api/youtube', youtubeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
