const express = require('express');
const router = express.Router();
const axios = require('axios');

// Liste des comptes Instagram
const INSTAGRAM_ACCOUNTS = {
  // Artistes
  "HIMRA": { username: "himraofficial", category: "artist", haloColor: "#4A90E2" },
  "Didi B": { username: "didibofficiel", category: "artist", haloColor: "#4A90E2" },
  "PHILIPAYNE": { username: "philipayne", category: "artist", haloColor: "#4A90E2" },
  "Sindika": { username: "sindikaofficiel", category: "artist", haloColor: "#4A90E2" },
  "Ivorian Doll": { username: "ivoriandoll", category: "artist", haloColor: "#4A90E2" },
  "Elow'n": { username: "elown", category: "artist", haloColor: "#4A90E2" },
  "Døpelym": { username: "dopelym", category: "artist", haloColor: "#4A90E2" },
  "Widgunz": { username: "widgunz", category: "artist", haloColor: "#4A90E2" },
  "Tripa Gninnin": { username: "tripagninnin", category: "artist", haloColor: "#4A90E2" },
  "Favé": { username: "faveofficiel", category: "artist", haloColor: "#4A90E2" },
  "Ass Le Bijoutier": { username: "asslebijoutier", category: "influenceur", haloColor: "#2ECC71" },
  "RapKing": { username: "rapkingofficial", category: "artist", haloColor: "#4A90E2" },
  "Josey": { username: "josey_officiel", category: "artist", haloColor: "#4A90E2" },
  "Dre-A": { username: "dreaofficiel", category: "artist", haloColor: "#4A90E2" },
  "Marla": { username: "marla_officiel", category: "artist", haloColor: "#4A90E2" },
  "Kadja": { username: "kadja__officiel", category: "artist", haloColor: "#4A90E2" },
  "Jojo Le Barbu": { username: "jojo_le_barbu_officiel", category: "artist", haloColor: "#4A90E2" },

  // Médias
  "Rap Ivoire": { username: "rap.ivoire", category: "media", haloColor: "#FFD700" },
  "Scoop du Rap Ivoirien": { username: "scoop_du_rap_ivoirien", category: "media", haloColor: "#FF6B35" },
  "La Lipongue": { username: "la_lipongue", category: "media", haloColor: "#FF6B35" },
  "BLED CI": { username: "bled.ci", category: "media", haloColor: "#FF6B35" },
  "Top du Moment": { username: "topdumomentofficiel", category: "media", haloColor: "#FF6B35" }
};

// Récupère les posts Instagram (simulé, à remplacer par l'API officielle)
router.get('/posts/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const account = Object.values(INSTAGRAM_ACCOUNTS).find(acc => acc.username === username);
    if (!account) return res.status(404).json({ error: "Compte non trouvé" });

    // Simulation de données (à remplacer par un appel API réel)
    const mockPosts = [
      {
        id: "1",
        imageUrl: `https://picsum.photos/500/500?random=${Math.random()}`,
        caption: `Nouveau son de ${username} ! 🔥`,
        likes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 1000),
        haloColor: account.haloColor,
        category: account.category
      },
      // ... (autres posts simulés)
    ];

    res.json(mockPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupère tous les comptes Instagram
router.get('/accounts', (req, res) => {
  res.json(INSTAGRAM_ACCOUNTS);
});

module.exports = router;
