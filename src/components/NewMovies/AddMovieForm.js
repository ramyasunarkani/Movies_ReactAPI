import React from 'react'
import classes from './AddMovieForm.module.css'
const AddMovieForm = () => {
  return (
    <form>
    <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type="text" id='title'/>
    </div>
    <div  className={classes.control}>
        <label htmlFor='openText'>Opening Text</label>
       <textarea id="openText" rows="5"/>
    </div>
    <div  className={classes.control}>
      <label htmlFor='date'>Release Date</label>
      <input type='text' id='date'/>

    </div>
    </form>
  )
}

export default AddMovieForm