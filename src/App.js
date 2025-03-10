import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const[isLoading,SetisLoading ]=useState(false)
  async function fetchMoviesHandler(){
    SetisLoading(true);
    try{const response= await fetch('https://swapi.dev/api/films')
    const data= await response.json();
    const transFormed=data.results.map(movie=>{
        return{
          id:movie.episode_id,
          title:movie.title,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date,
        }
      })
      setMovies(transFormed);

    }catch(error){

    }
    SetisLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&&movies.length>0&&(<MoviesList movies={movies} />)}
        {!isLoading&&movies.length===0 &&<p>No Movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
