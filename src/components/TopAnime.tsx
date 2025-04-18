import { useEffect, useState } from 'react';
import '../styles/TopAnime.css'
import Navbar from './Navbar';
interface AnimeCard {
  mal_id: number;
  title: string;
  type: string;
  episodes: number;
  score: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  members: string;
  aired: string;
}

function TopAnime() {
  const [animeList, setAnimeList] = useState<AnimeCard[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25`);
      const data = await response.json();
      setAnimeList(data.data);
    } catch (error) {
      console.error('Fetch failed:', error);
    } 
  };

  fetchData();
}, []);


  return (
    <>
        <Navbar />
        <div className="top-anime-list">
    {animeList.map((anime, index) => (
    <div key={anime.mal_id} className="anime-row">
      <div className="rank">{index + 1}</div>

      <div className="anime-main">
        <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-thumb" />
        <div className="anime-meta">
          <h3 className="anime-title">{anime.title}</h3>
          <p>{anime.type} ({anime.episodes} eps)</p>
          <p>{anime.aired?.string ?? 'Airing Info N/A'}</p>
          <p>{anime.members?.toLocaleString()} members</p>
        </div>
      </div>

      <div className="score">
        ⭐ {anime.score ?? 'N/A'}
      </div>

      <div className="your-score">
        ☆ N/A
      </div>

      <div className="status-btn">
        <button>Plan to Watch</button>
      </div>
    </div>
  ))}
</div>
    </>
    

    
  );
}

export default TopAnime;
