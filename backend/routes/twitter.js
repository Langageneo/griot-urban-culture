const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

router.get('/tweets/:username', async (req, res) => {
  try {
    const user = await twitterClient.v2.userByUsername(req.params.username);
    const tweets = await twitterClient.v2.userTimeline(user.data.id, { max_results: 10 });
    res.json(tweets.data.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
