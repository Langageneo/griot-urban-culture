require('dotenv').config();
const express = require('express');
const Flutterwave = require('flutterwave-node-v3');

const router = express.Router();

// Flutterwave instance
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// Vérifier un paiement
router.post('/verify', async (req, res) => {
  try {
    const { transactionId, expectedAmount } = req.body;

    const response = await flw.Transaction.verify({ id: transactionId });

    if (response.data.currency !== 'XOF') return res.status(400).json({ error: 'Devise non supportée' });
    if (response.data.amount !== expectedAmount) return res.status(400).json({ error: 'Montant incorrect' });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
