import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get("type") || "all"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://api.jikan.moe/v4/top/anime?limit=25";

        if (activeType === "airing") {
          url += "&filter=airing";
        } else if (["tv", "movie", "ova"].includes(activeType)) {
          url += `&type=${activeType}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchData();
  }, [activeType]);

  const handleTypeChange = (type: string) => {
    setSearchParams(type === "all" ? {} : { type }); // updates URL
  };


  return (
    <>
        <Navbar />
        
        <div className="top-anime-list">
          <div className="top-anime"><h2>Top Anime</h2></div>
        <nav className="top-anime-type">
          <div className="top-anime-types">
            <button className={`type ${activeType === "all" ? "active" : ""}`} onClick={() => handleTypeChange("all")}>All Anime</button>
            <button className={`type ${activeType === "airing" ? "active" : ""}`} onClick={() => handleTypeChange("airing")}>Top Airing</button>
            <button className={`type ${activeType === "tv" ? "active" : ""}`} onClick={() => handleTypeChange("tv")}>Top TV series</button>
            <button className={`type ${activeType === "movie" ? "active" : ""}`} onClick={() => handleTypeChange("movie")}>Top Movies</button>
            <button className={`type ${activeType === "ova" ? "active" : ""}`} onClick={() => handleTypeChange("ova")}>Top Ova</button>
          </div>
          <div className="next">
            <button className="next-btn">Next</button>
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
        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>
</span> <span className="score-value">{anime.score ?? 'N/A'}</span>
      </div>

      <div className="your-score">
         N/A
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
