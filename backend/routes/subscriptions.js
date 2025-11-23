const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Créer un abonnement
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });

    const { planId } = req.body;
    let subscription, expiryDate;

    switch (planId) {
      case 'premium_monthly':
        subscription = 'premium';
        expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;
      case 'lifetime':
        subscription = 'lifetime';
        expiryDate = new Date('2099-12-31'); // Date lointaine
        break;
      default:
        return res.status(400).json({ msg: 'Plan invalide' });
    }

    user.subscription = subscription;
    user.subscriptionExpiry = expiryDate;
    await user.save();

    res.json({
      subscription: user.subscription,
      expiryDate: user.subscriptionExpiry
    });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Vérifier l'abonnement
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Utilisateur non trouvé' });

    res.json({
      subscription: user.subscription,
      expiryDate: user.subscriptionExpiry
    });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
