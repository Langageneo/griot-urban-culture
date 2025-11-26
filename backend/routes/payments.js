const express = require("express");
const router = express.Router();
const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

router.post("/verify", async (req, res) => {
  try {
    const { transactionId, expectedAmount } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: "transactionId manquant" });
    }

    const response = await flw.Transaction.verify({ id: transactionId });

    if (!response || !response.data) {
      return res.status(500).json({ error: "Réponse Flutterwave invalide" });
    }

    // Vérifie devise
    if (response.data.currency !== "XOF") {
      return res.status(400).json({ error: "Devise non supportée" });
    }

    // Vérifie montant
    if (expectedAmount && response.data.amount !== expectedAmount) {
      return res.status(400).json({ error: "Montant incorrect" });
    }

    res.json({
      status: "success",
      message: "Paiement validé",
      data: response.data,
    });

  } catch (err) {
    console.error("Erreur Flutterwave :", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
