const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const youtube = google.youtube('v3');

// Récupérer les vidéos d'une chaîne
router.get('/channel/:channelId', async (req, res) => {
  try {
    const response = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      channelId: req.params.channelId,
      part: 'snippet',
      order: 'date',
      maxResults: 10
    });
    res.json(response.data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
