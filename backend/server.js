require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

// Import des routes
// Assurez-vous que ces fichiers existent bien dans le dossier /routes/
const youtubeRoutes = require('./routes/youtube');
const instagramRoutes = require('./routes/instagram');
const twitterRoutes = require('./routes/twitter');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscriptions');
const paymentRoutes = require('./routes/payments');

const app = express();

// --- Middleware de Sécurité et Configuration ---

// Helmet sécurise les en-têtes HTTP
app.use(helmet());

// Configuration CORS
// J'ai ajouté '*' pour faciliter le développement mobile (UserLAnd/Flutter)
// En production, remplacez '*' par votre URL de frontend réelle.
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://10.0.2.2:5000', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Permet de lire les JSON envoyés par le frontend
app.use(morgan('dev'));  // Affiche les requêtes dans la console

// Rate limiting (Limite le nombre de requêtes pour éviter le spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use(limiter);

// --- Connexion Base de Données ---

// Note: Les options useNewUrlParser/useUnifiedTopology ne sont plus nécessaires avec Mongoose 8+
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("❌ ERREUR FATALE: La variable MONGODB_URI est manquante dans le fichier .env");
} else {
  mongoose.connect(dbURI)
  .then(() => console.log('✅ Connecté à MongoDB avec succès'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));
}

// --- Définition des Routes ---

app.use('/api/youtube', youtubeRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/twitter', twitterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// Route de test (Racine)
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Backend Griot Urban Culture est EN LIGNE 🚀',
    platform: process.platform
  });
});

// Gestion des erreurs 404 (Route non trouvée)
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée (404)' });
});

// Gestionnaire global des erreurs (Empêche le crash complet en cas de bug mineur)
app.use((err, req, res, next) => {
  console.error('🔥 Erreur Serveur:', err.stack);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// --- Démarrage du Serveur ---

const PORT = process.env.PORT || 5000;

// La correction est ICI (plus de coupure de ligne)
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`👉 Test local: http://localhost:${PORT}`);
});
