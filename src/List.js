import { useState } from "react"
import './List.css'
export default function List(props) {
  const [editing, setEditing] = useState(false);
  

  function handleEditing() {
    setEditing(true);
  }
  function handleUpdatedDone (event) {
    if (event.key === 'Enter') {
      setEditing(false);
    }
  };
return(
    <div className="list-container">
    {
      props.movies.map((item) => (
        
        <div className="list-item" key={item.imdbID}>
          <div className="left">
          
          {/* <p className={item.completed ? 'completed' : null}> */}
          
          { editing ? (<input
            type="text"
            value={item.title}
            className='text-input'
            onChange={(e) =>  props.updateTitle(e.target.value, item.imdbID)}
            onKeyDown={handleUpdatedDone}
          />):<h3 className="h3-movie-title">{item.title}</h3>}
          <p>Genre: {item.genre}</p>
  
          
  
          </div>
          <div className="right">
          <input className="checkbox" type='checkbox' onChange={(e) => props.handleCheck(e, item.imdbID)}/>
            <button onClick={handleEditing}>Edit Title</button>

            {
          item.completed ? (
            <button onClick={() => props.handleWatched(item.imdb)}>Watched!</button>
          ) : (
            <button onClick={() => props.handleCompleteMovie(item.imdbID)}>Watch</button>
          )
        }
          </div>

          </div>
      ))
    }
  </div>
)

}