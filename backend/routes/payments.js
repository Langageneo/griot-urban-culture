const express = require('express');
const router = express.Router();
const Flutterwave = require('flutterwave-node-v3');

// Initialisation Flutterwave
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

// Vérification de transaction
router.post('/verify', async (req, res) => {
  try {
    const { transactionId, expectedAmount } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: 'transactionId requis' });
    }

    // Appel API Flutterwave
    const response = await flw.Transaction.verify({ id: transactionId });

    if (!response || !response.data) {
      return res.status(400).json({ error: 'Transaction introuvable' });
    }

    const tx = response.data;

    // Vérifie la devise
    if (tx.currency !== 'XOF') {
      return res.status(400).json({ error: 'Devise non supportée (XOF uniquement)' });
    }

    // Vérifie le montant attendu
    if (expectedAmount && tx.amount !== expectedAmount) {
      return res.status(400).json({ error: 'Montant incorrect' });
    }

    res.json({
      status: "success",
      message: "Paiement vérifié avec succès",
      data: tx
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export du router
module.exports = router;
