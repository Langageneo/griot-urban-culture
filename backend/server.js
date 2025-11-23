require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const youtubeRoutes = require('./routes/youtube');
const twitterRoutes = require('./routes/twitter');
const instagramRoutes = require('./routes/instagram');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes API
app.use('/api/youtube', youtubeRoutes);
app.use('/api/twitter', twitterRoutes);
app.use('/api/instagram', instagramRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
