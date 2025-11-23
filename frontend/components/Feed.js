export default function Feed({ videos }) {
  return (
    <div className="feed">
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          <img src={video.thumbnail} alt={video.title} />
          <h3>{video.title}</h3>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            Voir sur YouTube
          </a>
        </div>
      ))}
    </div>
  );
                  }
