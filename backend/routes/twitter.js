const express = require('express');
const router = express.Router();

// Liste des comptes Twitter/X
const TWITTER_ACCOUNTS = {
  "Rap Ivoire": { username: "RAP_IVOIRE", category: "media", haloColor: "#FFD700" },
  "Scoop du Rap Ivoirien": { username: "Scoopdurap225", category: "media", haloColor: "#FF6B35" },
  "La Lipongue": { username: "laLipongue", category: "media", haloColor: "#FF6B35" },
  "BLED CI": { username: "bled_ci", category: "media", haloColor: "#FF6B35" }
};

// Récupère les tweets (simulé)
router.get('/tweets/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const account = Object.values(TWITTER_ACCOUNTS).find(acc => acc.username === username);
    if (!account) return res.status(404).json({ error: "Compte non trouvé" });

    // Simulation de tweets
    const mockTweets = [
      {
        id: "1",
        text: `${username} : Le rap ivoirien est en feu en ce moment ! 🔥 #RapIvoire`,
        likes: Math.floor(Math.random() * 5000),
        retweets: Math.floor(Math.random() * 1000),
        haloColor: account.haloColor,
        category: account.category
      },
      // ... (autres tweets simulés)
    ];

    res.json(mockTweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupère tous les comptes Twitter
router.get('/accounts', (req, res) => {
  res.json(TWITTER_ACCOUNTS);
});

module.exports = router;
