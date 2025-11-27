require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

// --- Import des Routes ---
// Webhook doit être importé séparément pour être géré en premier
const webhookRoutes = require('./routes/webhook'); 
const youtubeRoutes = require('./routes/youtube');
const instagramRoutes = require('./routes/instagram');
const twitterRoutes = require('./routes/twitter');
const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscriptions');
const paymentRoutes = require('./routes/payments');

const app = express();

// --- Middleware de Sécurité et Configuration ---

// 🚨 1. ROUTE WEBHOOK (DOIT ÊTRE EN PREMIER POUR GÉRER LE CORPS BRUT)
// Cette route n'utilise pas le middleware global express.json()
app.use('/api/webhook', webhookRoutes); 

// 2. Middlewares Globaux

// Helmet sécurise les en-têtes HTTP
app.use(helmet());

// Configuration CORS (autorise le développement mobile/local)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://10.0.2.2:5000', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Express.json() est ici, après le Webhook
app.use(express.json()); 
app.use(morgan('dev'));  

// Rate limiting 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use(limiter);

// --- Connexion Base de Données ---
const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("❌ ERREUR FATALE: MONGODB_URI est manquant dans le fichier .env");
} else {
  mongoose.connect(dbURI)
  .then(() => console.log('✅ Connecté à MongoDB avec succès'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));
}

// --- Définition des Routes d'API ---

app.use('/api/youtube', youtubeRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/twitter', twitterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes); // Route Paiements Flutterwave

// Route de test (Racine)
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Backend Griot Urban Culture est EN LIGNE 🚀'
  });
});

// Gestion des erreurs 404 (Route non trouvée)
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée (404)' });
});

// Gestionnaire global des erreurs 500
app.use((err, req, res, next) => {
  console.error('🔥 Erreur Serveur:', err.stack);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// --- Démarrage du Serveur (Ligne corrigée) ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`👉 Test local: http://localhost:${PORT}`);
});
