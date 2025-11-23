const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getChannelVideos(channelId) {
  try {
    const res = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      channelId: channelId.replace('@', ''),
      maxResults: 10,
      order: 'date',
      type: 'video'
    });
    return res.data.items.map(item => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (err) {
    throw new Error(`Erreur YouTube: ${err.message}`);
  }
}

module.exports = { getChannelVideos };
