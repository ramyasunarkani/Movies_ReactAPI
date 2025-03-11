import React, { useRef } from 'react'
import classes from './AddMovieForm.module.css'
const AddMovieForm = () => {
    const titleRef=useRef('');
    const openingTextRef=useRef('');
    const releaseDateRef=useRef('');
    function submitHandler(event){
        event.preventDefault();
        const movie={
            title:titleRef.current.value,
            openingText:openingTextRef.current.value,
            releaseDate:releaseDateRef.current.value

        }
        console.log(movie);
    }


  return (
    <form onSubmit={submitHandler}>
    <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type="text" id='title' ref={titleRef}/>
    </div>
    <div  className={classes.control}>
        <label htmlFor='openText'>Opening Text</label>
       <textarea id="openText" rows="5" ref={openingTextRef}/>
    </div>
    <div  className={classes.control}>
      <label htmlFor='date'>Release Date</label>
      <input type='text' id='date' ref={releaseDateRef}/>
    </div>
    <button>Add Movie</button>
    </form>
  )
}

export default AddMovieForm