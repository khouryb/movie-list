import { useState } from "react"

export default function List(props) {



return(
    <div>
    {
      props.movie.map((item, index) => (
        <div key={index}>
        <p className={item.completed ? 'completed' : null}>
          {item.title}{item.genre}{item.imdbID}
        </p>
        
        <input type='checkbox' onChange={() => props.handleCheck(item.imdbID)}/>
        
        {
          item.completed ? (
            <button onClick={() => props.handleDeleteMovies([item.imdbID])}>Delete</button>
          ) : (
            <button onClick={() => props.handleCompleteMovie(index)}>Complete</button>
          )
        }
        
          </div>
      ))
    }
  </div>
)

}