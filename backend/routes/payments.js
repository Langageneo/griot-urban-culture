const express = require('express');
const router = express.Router();
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

// Exemple endpoint pour vérifier un paiement
router.post('/verify', async (req, res) => {
  try {
    const { transactionId, expectedAmount } = req.body;
    const response = await flw.Transaction.verify({ id: transactionId });

    if (response.data.currency !== 'XOF') {
      return res.status(400).json({ error: 'Devise non supportée' });
    }

    if (response.data.amount !== expectedAmount) {
      return res.status(400).json({ error: 'Montant incorrect' });
    }

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
