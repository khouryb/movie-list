import ListItem from "./ListItem"
import './List.css'
export default function List(props) {

  return(
    <div className="list-container">
    {
      props.movies.map((item) => (
        <ListItem key={item.imdbID} handleCompleteMovie={props.handleCompleteMovie} handleWatched={props.handleWatched} handleCheck={props.handleCheck} item={item} />
      ))
    }
  </div>
)

}