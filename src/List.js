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
      props.movie.map((item) => (
        <div className="list-item" key={item.imdbID}>
        {/* <p className={item.completed ? 'completed' : null}> */}
        <h3>{item.title}</h3><button onClick={handleEditing}>Edit Title</button>
        { editing && (<input
          type="text"
          value={item.title}
          className='text-input'
          onChange={(e) =>  props.updateTitle(e.target.value, item.imdbID)}
          onKeyDown={handleUpdatedDone}
        />)}
        <p>Genre: {item.genre}</p>
        <input type='checkbox' onChange={(e) => props.handleCheck(e, item.imdbID)}/>
        
        {
          item.completed ? (
            <button onClick={() => props.handleWatched(item.imdb)}>Watched!</button>
          ) : (
            <button onClick={() => props.handleCompleteMovie(item.imdbID)}>Watch</button>
          )
        }
        
          </div>
      ))
    }
  </div>
)

}