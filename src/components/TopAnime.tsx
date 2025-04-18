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
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
  const fetchData = async () => {
    try {
      
      let url = "https://api.jikan.moe/v4/top/anime?limit=25";

      if (activeType === "airing") {
          url = "https://api.jikan.moe/v4/top/anime?filter=airing&limit=25";
        } else if (activeType === "tv") {
          url = "https://api.jikan.moe/v4/top/anime?type=tv&limit=25";
        } else if (activeType === "movie") {
          url = "https://api.jikan.moe/v4/top/anime?type=movie&limit=25";
        } else if (activeType === "ova") {
          url = "https://api.jikan.moe/v4/top/anime?type=ova&limit=25";
        }
      const response = await fetch(url);
      const data = await response.json();
      setAnimeList(data.data);
    } catch (error) {
      console.error('Fetch failed:', error);
    } 
  };

  fetchData();
}, [activeType]);
 const handleTypeChange = (type: string) => {
    setActiveType(type);
  };


  return (
    <>
        <Navbar />
        
        <div className="top-anime-list">
          <div className="top-anime"><h2>Top Anime</h2></div>
        <nav className="top-anime-type">
          <div className="top-anime-types">
            <button className={`type ${activeType === "all" ? "active" : ""}`} onClick={()=>handleTypeChange("all")}>All Anime</button>
            <button className={`type ${activeType === "airing" ? "active" : ""}`} onClick={()=>handleTypeChange("airing")}>Top Airing</button>
            <button className={`type ${activeType === "tv" ? "active" : ""}`} onClick={()=>handleTypeChange("tv")}>Top TV series</button>
            <button className={`type ${activeType === "movie" ? "active" : ""}`} onClick={()=>handleTypeChange("movie")}>Top Movies</button>
            <button className={`type ${activeType === "ova" ? "active" : ""}`} onClick={()=>handleTypeChange("ova")}>Top Ova</button>
          </div>
        </nav>
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
        <span >⭐</span> {anime.score ?? 'N/A'}
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
