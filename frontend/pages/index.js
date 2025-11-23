import { useState, useEffect } from 'react';
import Feed from '../components/Feed';
import HaloEffect from '../components/HaloEffect';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Récupérer les vidéos depuis le backend
    fetch('http://localhost:5000/api/youtube/@scoopdurapivoirien6861')
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  return (
    <div className="container">
      <HaloEffect />
      <h1>Flux Rap Ivoirien</h1>
      <Feed videos={videos} />
    </div>
  );
    }
