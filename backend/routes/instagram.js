const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/posts/:userId', async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.instagram.com/${req.params.userId}/media?fields=id,caption,media_url&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
