import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import '../styles/AnimePage.css';


interface AnimeDescription{
    mal_id: number;
    title: string;
    type: string;
    episodes: number;
    score: string;
    images:{
        jpg:{
            image_url: string;
        };
    };
    members: string;
    aired: string;
    description: string;
}

export default function AnimePage(){


    const {id} = useParams()


    const [ anime, setAnime ] = useState<AnimeDescription | null>(null);
    const [loading, setIsLoading] = useState(true); 

    useEffect(()=>{
        const fetchAnime = async ()=> {
            try{
                setIsLoading(true);
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const content = await res.json();
                setAnime(content.data);
            }
            catch(err){
                console.error(`Fetch Failed :`, err);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchAnime();

    },[id]);

  if (loading) return <p>Loading...</p>;
  if (!anime) return <p>Anime not found.</p>;

    return(
        <>
            <div className="anime-detail">
                <h2>{anime.title}</h2>
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <p><strong>Type:</strong> {anime.type}</p>
                <p><strong>Episodes:</strong> {anime.episodes}</p>
                <p><strong>Score:</strong> {anime.score}</p>
                <p><strong>Members:</strong> {anime.members}</p>
                <p><strong>Aired:</strong> {anime.aired?.string}</p>
                <p><strong>Description:</strong> {anime.description}</p>
            </div>

        </>
    )
}