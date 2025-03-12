import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovieForm from './components/NewMovies/AddMovieForm';
function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,SetisLoading ]=useState(false);
  const [error,setError]=useState(null);
  const [retryIntervalId,setRetryIntervalId]=useState(null)
  const fetchMoviesHandler=useCallback(async ()=>{

      SetisLoading(true);
      setError(null);
      try{
        const response= await fetch('https://react-api-ba282-default-rtdb.firebaseio.com/movies.json');
        if(!response.ok){
          throw new Error ('Something went wrong ....Retrying')
        }
        const data= await response.json();
        const loadedMovies=[];
        for( const key in data){
          loadedMovies.push({
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            releaseDate:data[key].releaseDate
          })

        }
        setMovies(loadedMovies);
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
    },[fetchMoviesHandler])

   useEffect(() => {
    return () => {
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
    };
  }, [retryIntervalId]);

 
  async function addMovieHandler(movie){
   const response=await fetch('https://react-api-ba282-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data= await response.json();
    console.log(data)
    setMovies(prev=>[...prev,{ id: data.name, ...movie }])
  }
  async function deleteMovieHandler(movieId){

    try {
      const response=await fetch(`https://react-api-ba282-default-rtdb.firebaseio.com/movies/${movieId}.json`,{
        method:'DELETE'
        })
        if(!response.ok){
          throw new Error('not delete')
        }
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      }catch(error){
    console.error(error.message);
      }
  }
   const movieContent = useMemo(() => {
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (movies.length > 0) return <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>;
    return <p>No Movies found</p>;
  }, [isLoading, error, movies]);
  return (
    <React.Fragment>
      <section>
        <AddMovieForm onAddMovie={addMovieHandler}/>
      </section>
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
