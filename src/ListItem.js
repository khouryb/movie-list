import { useState } from "react";
import './ListItem.css';

export default function ListItem(props) {
    const [editing, setEditing] = useState(false);
  

    function handleEditing() {
        setEditing(true);
    };

    function handleUpdatedDone (event) {
      if (event.key === 'Enter') {
        setEditing(false);
      }
    };

    return(
      <div className="list-item" key={props.item.imdbID}>
        <div className="left">
          <img className="image" src={props.item.poster} alt='movie poster' width='100' height='150'></img>
          <div className='movie-info'>
            {editing ? (<input
              type="text"
              value={props.item.title}
              className='text-input'
              onChange={(e) =>  props.updateTitle(e.target.value, props.item.imdbID)}
              onKeyDown={handleUpdatedDone}
            />) : <h3 className="h3-movie-title" onClick={handleEditing}>{props.item.title}</h3>}
            <p>Genre: {props.item.genre}</p>
          </div>
        
        </div>

      <div className="right">
      <input className="checkbox" type='checkbox' onChange={(e) => props.handleCheck(e, props.item.imdbID)}/>
        <button onClick={handleEditing}>Edit Title</button>
        {
      props.item.completed ? (
        <button onClick={() => props.handleWatched(props.item.imdb)}>Watched!</button>
      ) : (
        <button onClick={() => props.handleCompleteMovie(props.item.imdbID)}>Watch</button>
      )
    }
      </div>

      </div>
    )
}