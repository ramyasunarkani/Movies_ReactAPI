import React from 'react';
import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        type="button"
        className={classes['delete-btn']}
        onClick={() => props.onDelete(props.id)} // ✅ Calls correct function
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
