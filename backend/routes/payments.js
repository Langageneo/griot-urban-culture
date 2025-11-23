const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

router.post('/verify', async (req, res) => {
  try {
    const { transactionId } = req.body;
    const response = await flw.Transaction.verify({ id: transactionId });

    // Vérifie que le paiement est valide et en XOF
    if (response.data.currency !== 'XOF') {
      return res.status(400).json({ error: 'Devise non supportée' });
    }

    // Vérifie que le montant correspond
    if (response.data.amount !== expectedAmount) {  // À définir selon ton abonnement
      return res.status(400).json({ error: 'Montant incorrect' });
    }

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
