import React, { useEffect ,useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import {Link} from 'react-router-dom'
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'


const apiKey="e6f3682a7cf9c249098500bc5be0886b"
const url="https://api.themoviedb.org/3"
const imgurl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming"
const nowPlaying="now_playing"
const popular="popular"
const topRated="top_rated"

const Card=({img})=>(


  <img className='card' src={img} alt='cover'/>
)


const Row=({title,arr=[{
  img: "https://images.hdqwalls.com/wallpapers/avengers-endgame-2019-official-poster-th.jpg"

}]})=>(
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item,index)=>( <Card  key={index} img={`${imgurl}/${item.poster_path}`}/>))
      }

   
   
    </div>
  </div>
)

function Home() {

      const [upcomingMovies,setupcomingMovies] =useState([]);
      const [nowPlayingMovies,setnowPlayingMovies] =useState([]);
      const [popularMovies,setpopularMovies] =useState([]);
      const [topratedMovies,setopratedMovies] =useState([]); 
      const [genre,setGenre]=useState([]);
    
        
     
      
  
   


  useEffect(()=>{

    const fetchUpcoming=async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
   
    setupcomingMovies(results)
   

    };

    const fetchNowplaying=async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
     
      setnowPlayingMovies(results)
     
  
      };


      const fetchPopular=async()=>{
        const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
       
        setpopularMovies(results)
       console.log(results)
       
    
        };

        const fetchToprated=async()=>{
          const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
         
          setopratedMovies(results)
         
      
          };



          const getAllGenre=async()=>{
            const {data:{genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
           
            setGenre(genres);
            console.log(genres)
           
        
            };


         

     






      getAllGenre();
    fetchPopular();
    fetchNowplaying();
    fetchUpcoming()
    fetchToprated()

  },[])




  return (
    
    <section className='home'>
      <div className="banner"  style={{

        backgroundImage:popularMovies[0]?`url(${`${imgurl}/${popularMovies[0].poster_path}`})`:"rgba(16,16,16)"
      }}>
        {
          popularMovies[0]&&
          (
            <h1>{popularMovies[0].original_title}</h1>

          )
        }

{
          popularMovies[0]&&
          (
            <p>{popularMovies[0].overview}</p>
           

          )
        }
          <div>
        <button>Play <BiPlay/></button>
        <button>My List <AiOutlinePlus/></button>
        </div>

      
        
        


      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies}/>
      <Row title={"Popular Movies"} arr={popularMovies}/>
      <Row title={"Top Rated Movies"} arr={topratedMovies}/>
      

      <div className='genreBox'>
        {genre.map((item)=>
        <Link  key={item.index} to={`/genre/${item.id}`}>{item.name}</Link>
        
        )}
      </div>
      
      

    </section>
     
  )

    }
 


export default Home