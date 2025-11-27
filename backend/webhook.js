// webhook.js
const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Vérifie le signature pour Flutterwave (sécurité)
function verifySignature(req) {
  const secretHash = process.env.FLW_SECRET_KEY;
  const hash = crypto
    .createHmac('sha256', secretHash)
    .update(JSON.stringify(req.body))
    .digest('hex');

  return hash === req.headers['verif-hash'];
}

// Endpoint webhook
router.post('/webhook', express.json(), (req, res) => {
  if (!verifySignature(req)) {
    console.log('❌ Signature webhook invalide');
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;

  // Exemple : gestion du paiement réussi
  if (event.event === 'charge.completed' && event.data.status === 'successful') {
    const userId = event.data.customer.customer_id; 
    // Ici, activer l'abonnement premium de l'utilisateur
    console.log(`✅ Paiement réussi pour l'utilisateur ${userId}`);
    // TODO: Mettre à jour la DB pour activer le premium
  }

  res.status(200).send('Webhook reçu');
});

module.exports = router;
