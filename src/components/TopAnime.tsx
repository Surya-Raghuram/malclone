import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles/TopAnime.css';
import { Link } from 'react-router-dom';


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
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);



  const activeType = searchParams.get("type") || "all";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const pagenumber = Math.max(1, pageParam); // ensure page >= 1




  useEffect(() => {
  const controller = new AbortController(); // To cancel old requests
  const fetchData = async () => {
    try {
      setIsLoading(true);
      let url = `https://api.jikan.moe/v4/top/anime?limit=25&page=${pagenumber}`;
      if (activeType === "airing") {
        url += "&filter=airing";
      } else if (["tv", "movie", "ova"].includes(activeType)) {
        url += `&type=${activeType}`;
      }

      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();
      setAnimeList(data.data);

      setTotalPages(data.pagination?.last_visible_page || 1);  //This line adds total pages


    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Fetch failed:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();

  return () => controller.abort(); // Cancel previous fetch on type/page change
}, [activeType, pagenumber]);


  const handleTypeChange = (type: string) => {
    setSearchParams({ type, page: "1" });
  };

  const handleNextPage = () => {
    setSearchParams({ type: activeType !== "all" ? activeType : "", page: (pagenumber + 1).toString() });
  };

  return (
    <div className="top-anime-list">
      <div className="top-anime"><h2>Top Anime</h2></div>
      <nav className="top-anime-type">
        <div className="top-anime-types">
          <button className={`type ${activeType === "all" ? "active" : ""}`} onClick={() => handleTypeChange("all")}>All Anime</button>
          <button className={`type ${activeType === "airing" ? "active" : ""}`} onClick={() => handleTypeChange("airing")}>Top Airing</button>
          <button className={`type ${activeType === "tv" ? "active" : ""}`} onClick={() => handleTypeChange("tv")}>Top TV Series</button>
          <button className={`type ${activeType === "movie" ? "active" : ""}`} onClick={() => handleTypeChange("movie")}>Top Movies</button>
          <button className={`type ${activeType === "ova" ? "active" : ""}`} onClick={() => handleTypeChange("ova")}>Top OVA</button>
        </div>
        <div className="next">
          <button className="next-btn" onClick={handleNextPage}>Next</button>
        </div>
      </nav>

      { isLoading ? <p>Loading....</p>
          :animeList.map((anime, index) => (
            <div key={anime.mal_id} className="anime-row">
              <div className="rank">{(pagenumber - 1) * 25 + index + 1}</div>
                <div className="anime-main">
                  <Link to={`/anime/${anime.mal_id}`}className="anime-link">
                    <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-thumb" />
                  </Link>
                  
                  <div className="anime-meta">
                    <h3 className="anime-title">{anime.title}</h3>
                    <p>{anime.type} ({anime.episodes} eps)</p>
                    <p>{anime.aired?.string ?? 'Airing Info N/A'}</p>
                    <p>{anime.members?.toLocaleString()} members</p>
                  </div>
                </div>
                <div className="score">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="score-value">{anime.score ?? 'N/A'}</span>
                </div>
                <div className="your-score">N/A</div>
                <div className="status-btn"><button>Plan to Watch</button></div>
              </div>
          ))}
          <div className="pagination-container">
              {Array.from({ length: Math.min(11, totalPages) }, (_, i) => {
                const start = Math.max(1, pagenumber - 5);
                const end = Math.min(totalPages, pagenumber + 5);
                const page = start + i;

                if (page > end) return null;

                return (
                  <button
                    key={page}
                    className={`pagination-page ${pagenumber === page ? 'active' : ''}`}
                    onClick={() => setSearchParams({ type: activeType, page: page.toString() })}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

      </div>
  );
}

export default TopAnime;
