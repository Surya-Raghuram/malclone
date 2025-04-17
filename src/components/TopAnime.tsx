import { useEffect, useState } from 'react';
import Navbar  from './Navbar';
interface AnimeCard {
    id: number;
    title: string;
    type: string;
    episodes: number;
    rating : number;
    image: {
        jpg:{
            image_url: string;
        }
    }
}

function TopAnime(){

    const [animeList, setAnimeList] = useState<AnimeCard[]>([])
    const fetchData = async ()=> {
       
        try{
                const response = await fetch(`https://jikan.moe/v4/top/anime`);
                const data = await response.json();
                const animeData = data.data.slice(0, 10);    
                setAnimeList(animeData);
        } catch(error){
            console.error(error);
        }
    }    
    useEffect(()=>{
        fetchData();
    },[])

    return (
        <>
            <Navbar />
            <h1>Top Anime</h1>
            <div className="anime-grid">
                {animeList.map((anime)=>(
                    <div key={anime.id} className="anime-card">
                <img src={anime.image.jpg.image_url} alt={anime.title} className="anime-image" />
                <div className="anime-info">
                    <h2 className="anime-title">{anime.title}</h2>
                    <p>Type: {anime.type}</p>
                    <p>Episodes: {anime.episodes}</p>
                    <p>Rating: {anime.rating}</p>
                </div>
            </div>
            ))}
            </div>
            
        </>
    );

}
export default TopAnime;