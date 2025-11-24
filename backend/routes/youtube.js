const express = require('express');
const router = express.Router();
const axios = require('axios');

// Liste des chaînes YouTube (Artistes)
const ARTISTS = {
  "HIMRA": { id: "UCck5J0M6YKnXCrnuXkCFuvw", category: "artist", haloColor: "#4A90E2" },
  "Didi B": { id: "UClzKdPhr7GrMtFFVcgpMiLg", category: "artist", haloColor: "#4A90E2" },
  "PHILIPAYNE": { id: "@philipayne", category: "artist", haloColor: "#4A90E2" },
  "Sindika": { id: "@sindikaofficiel13", category: "artist", haloColor: "#4A90E2" },
  "Suspect95": { id: "UCrB0YInj44r9bC8T8hxJYeg", category: "artist", haloColor: "#4A90E2" },
  "Ivorian Doll": { id: "IVORIANDOLL", category: "artist", haloColor: "#4A90E2" },
  "Elow'n": { id: "UCUYym8QXZdgHEDiAzTQgdoA", category: "artist", haloColor: "#4A90E2" },
  "Døpelym": { id: "UCFWyspqbmArPfoj4i6W8DlA", category: "artist", haloColor: "#4A90E2" },
  "Widgunz": { id: "UCy9QrSpMFk-ggslrdkz0M6w", category: "artist", haloColor: "#4A90E2" },
  "Tripa Gninnin": { id: "UCKAHSWI1otyA5AoDXCTeUkw", category: "artist", haloColor: "#4A90E2" },
  "Favé": { id: "UC6yKbnMj2JpyaigY16AYQ9Q", category: "artist", haloColor: "#4A90E2" },
  "Ass Le Bijoutier": { id: "@ASSLEBIJOUTIER", category: "influenceur", haloColor: "#2ECC71" },
  "RapKing": { id: "@rapking69", category: "artist", haloColor: "#4A90E2" },
  "Josey": { id: "@joseyofficiel", category: "artist", haloColor: "#4A90E2" },
  "Dre-A": { id: "@dre-a8252", category: "artist", haloColor: "#4A90E2" },
  "Marla": { id: "@marlaofficiel", category: "artist", haloColor: "#4A90E2" },
  "Kadja": { id: "@kadjaofficiel5150", category: "artist", haloColor: "#4A90E2" },
  "Jojo Le Barbu": { id: "@jojolebarbuofficiel9065", category: "artist", haloColor: "#4A90E2" }
};

// Liste des chaînes YouTube (Médias)
const MEDIAS = {
  "Rap Ivoire": { id: "@rap.ivoire", category: "media", haloColor: "#FFD700" },
  "Scoop du Rap Ivoirien": { id: "@scoopdurapivoirien6861", category: "media", haloColor: "#FF6B35" },
  "La Lipongue": { id: "@la_lipongue", category: "media", haloColor: "#FF6B35" },
  "Logboo": { id: "@logbooofficiel", category: "influenceur", haloColor: "#2ECC71" },
  "BLED CI": { id: "@BLEDCI", category: "media", haloColor: "#FF6B35" },
  "Rapwave": { id: "@rapwaveci225", category: "media", haloColor: "#FF6B35" },
  "Top du Moment": { id: "@topdumoment-officiel", category: "media", haloColor: "#FF6B35" },
  "NL Officiel": { id: "@NLOfficielytb", category: "media", haloColor: "#FF6B35" },
  "Rap Autopsie": { id: "UCKVVhxgFM61rkz5pLmN0KEA", category: "media", haloColor: "#FF6B35" }
};

// Récupère les vidéos d'une chaîne YouTube
router.get('/channel/:channelId', async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`
    );
    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      haloColor: Object.values({...ARTISTS, ...MEDIAS}).find(c => c.id === channelId)?.haloColor || "#4A90E2"
    }));
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupère toutes les chaînes (pour le menu)
router.get('/channels', (req, res) => {
  res.json({ artists: ARTISTS, medias: MEDIAS });
});

module.exports = router;
