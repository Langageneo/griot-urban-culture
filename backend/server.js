require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

// Routes existantes
const youtubeRoutes = require('./routes/youtube');
const twitterRoutes = require('./routes/twitter');
const instagramRoutes = require('./routes/instagram');

// NOUVEAUX: Routes pour auth/abonnements/paiements
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscriptions');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Ajoute ton domaine en production
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(morgan('dev'));

// Limite les requêtes pour éviter les abus
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par fenêtre
});
app.use(limiter);

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur MongoDB:', err));

// Routes existantes (à garder)
app.use('/api/youtube', youtubeRoutes);
app.use('/api/twitter', twitterRoutes);
app.use('/api/instagram', instagramRoutes);

// NOUVEAUX: Routes pour l'authentification et paiements
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Backend Griot Urban Culture - OK' });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
