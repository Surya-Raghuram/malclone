import { useState,useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface Anime{
    mal_id: number;
    title: string;
    type: string;
    year: number;
    images:{
        jpg:{
            image_url: string;
        };
    };
}

const AnimeSearchButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const handleSearch = async () =>{
            if(!searchQuery.trim()){
                setSearchResults([]);
                return;
            }
            setIsLoading(true);
            try{
                const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&limit5`);
                const data = await response.json();
                setSearchResults(data.data || []);
            } catch(error) {
                console.error(`Error fetching anime: ${error}`);
            } finally{
                setIsLoading(false);
            }
        };
        const debounceTimeout = setTimeout(handleSearch, 500);
        return () => clearTimeout(debounceTimeout);

    },[searchQuery]);
    return (
        <div className="search-container">
          <input type="text" placeholder="Search Anime, Manga and more... " className ="search-input"
            value = {searchQuery}
            onChange={(e) =>{
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Search className="search-icon" size={20}/>
            {
                isDropdownOpen && (searchQuery || isLoading) &&(
                    <div className="search-dropdown">
                        {isLoading ? (
                            <div className="loading-container">
                                <Loader2 className="loading-spinner" size={24}/>
                            </div>
                        ): searchResults.length > 0 ? (
            <ul className="search-results">
              {searchResults.map((anime) => (
                <li key={anime.mal_id} className="search-result-item">
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="result-image"
                  />
                  <div className="result-info">
                    <span className="result-title">{anime.title}</span>
                    <span className="result-details">
                      {anime.type} • {anime.year || 'Year unknown'}
                    </span>
                  </div>
                
                </li>
              ))}
            </ul>
          ) : searchQuery ? (
            <div className="no-results">No results found</div>
          ) : null}               
                    </div>
                )
            }
        </div>

    );
}

export default AnimeSearchButton;
