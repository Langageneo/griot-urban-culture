// routes/payments.js
const express = require('express');
const router = express.Router();
const Flutterwave = require('flutterwave-node-v3');

// Tes clés Flutterwave sandbox
const flw = new Flutterwave(
  '1475fc98-2e9f-443e-812c-5a785567e845', // Client ID / Public Key sandbox
  'UV4q8ZobmhEEYmlcjLpzqIZLi6uf0cTo'      // Secret Key sandbox
);

// Exemple: montant attendu pour un abonnement ou paiement
const expectedAmount = 1000; // À adapter selon ton modèle

router.post('/verify', async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) return res.status(400).json({ error: 'Transaction ID requis' });

    const response = await flw.Transaction.verify({ id: transactionId });

    if (response.data.currency !== 'XOF') {
      return res.status(400).json({ error: 'Devise non supportée' });
    }

    if (response.data.amount !== expectedAmount) {
      return res.status(400).json({ error: 'Montant incorrect' });
    }

    res.json({ message: 'Paiement vérifié avec succès', transaction: response.data });

  } catch (err) {
    console.error('Erreur Flutterwave:', err.message);
    res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
});

module.exports = router;
