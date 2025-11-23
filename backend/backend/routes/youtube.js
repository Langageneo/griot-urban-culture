const express = require('express');
const { getChannelVideos } = require('../services/youtubeService');
const Video = require('../models/Video');

const router = express.Router();

// Récupérer les vidéos d'une chaîne YouTube
router.get('/:channelId', async (req, res) => {
  try {
    const videos = await getChannelVideos(req.params.channelId);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sauvegarder les vidéos en base de données
router.post('/save', async (req, res) => {
  try {
    const savedVideos = await Video.insertMany(req.body.videos);
    res.json(savedVideos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
