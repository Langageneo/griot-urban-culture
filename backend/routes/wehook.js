// webhook.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Middleware pour parser le JSON
router.use(express.json());

// 🔒 Vérification de la signature Flutterwave
function verifyFlutterwaveSignature(req) {
  const secretHash = process.env.FLW_SECRET_KEY;
  const hash = crypto
    .createHmac('sha256', secretHash)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return hash === req.headers['verif-hash'];
}

// Endpoint webhook Flutterwave
router.post('/flutterwave-webhook', (req, res) => {
  try {
    if (!verifyFlutterwaveSignature(req)) {
      console.log('❌ Signature webhook invalide');
      return res.status(401).send('Unauthorized');
    }

    const event = req.body;

    // 🔹 Gestion d'un paiement réussi
    if (event.event === 'charge.completed' && event.data.status === 'successful') {
      const userId = event.data.customer.customer_id; // ID utilisateur dans ta DB
      const amount = event.data.amount;
      const currency = event.data.currency;

      console.log(`✅ Paiement réussi pour l'utilisateur ${userId}, montant: ${amount} ${currency}`);

      // TODO: mettre à jour la DB pour activer le compte premium
      // Ex: User.findByIdAndUpdate(userId, { premium: true, paidAt: new Date() })
    }

    res.status(200).send('Webhook reçu ✅');
  } catch (err) {
    console.error('⚠️ Erreur webhook:', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
