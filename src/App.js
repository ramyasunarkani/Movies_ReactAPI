import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,SetisLoading ]=useState(false);
  const [error,setError]=useState(null);
  const [retryIntervalId,setRetryIntervalId]=useState(null)
  const fetchMoviesHandler=useCallback(async ()=>{

      SetisLoading(true);
      setError(null);
      try{
        const response= await fetch('https://swapi.dev/api/films');
        if(!response.ok){
          throw new Error ('Something went wrong ....Retrying')
        }
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
        if(retryIntervalId){
          clearInterval(retryIntervalId);
          setRetryIntervalId(null);
        }

      }catch(error){
        setError(error);

        if (!retryIntervalId) {
          const intervalId = setInterval(() => {
            fetchMoviesHandler(); 
          }, 5000);
          setRetryIntervalId(intervalId);
        }

      }
      SetisLoading(false);
    
  },[retryIntervalId])

  const cancelRetryHandler=useCallback(()=>{
    if(retryIntervalId){
      clearInterval(retryIntervalId);
      setRetryIntervalId(null);
      setError(new Error('Retrying canceled by user.'));

    }
  },[retryIntervalId])    
    
  
    useEffect(()=>{
      fetchMoviesHandler();
    },[])

   useEffect(() => {
    return () => {
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
    };
  }, [retryIntervalId]);

  const movieContent = useMemo(() => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (movies.length > 0) return <MoviesList movies={movies} />;
    return <p>No Movies found</p>;
  }, [isLoading, error, movies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        {retryIntervalId && <button onClick={cancelRetryHandler}>Cancel Retry</button>}
      </section>
      <section>
        {movieContent}
      </section>
    </React.Fragment>
  );
}

export default App;
