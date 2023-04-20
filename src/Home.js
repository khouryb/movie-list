import {useState} from 'react'
import List from './List';
import Nav from './Nav';

export default function Home() {
    // const initialMovie = useEffect(getInitialMovie())

  // function getInitialMovie() {}

  const [movies, setMovies] = useState([]);

  const [newMovie, setNewMovie] = useState("")

  const handleChange = (e) => {
    setNewMovie(e.target.value)
  }
  const [checked, setChecked] = useState([])

  const handleCheck = (e, id) => {
    let checkedList = [...checked]
    if (!checked.includes(id)){
      checkedList = [...checked, id]}
    else{
      const index = checked.findIndex((imdbID) => imdbID === id)
      checkedList.splice(index, 1)
    }
    setChecked(checkedList)
      
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
      fetch(`http://omdbapi.com/?t=${newMovie}&apikey=80abee2e&`)
      .then((response) => response.json())
      .then((result) => setMovies([...movies, {title: result.Title, genre: result.Genre, imdbID: result.imdbID, completed: false}]))
    
    
    setNewMovie('')
  }

  const handleCompleteMovie = (id) => {

    setMovies(
        movies.map((movie) => {
          if (movie.imdbID === id) {
            movie.completed = true;
          }
          return movie;
        })
  )
  }

  const handleWatched = (id) => {
    setMovies(
        movies.map((movie) => {
          if (movie.imdbID === id) {
            movie.completed = false;
          }
          return movie;
        })
    )
  }

  // const handleDeleteMovie = (id) => {
  //   const newMovie = [...movie];
  //   const index = newMovie.findIndex((movie) => movie.imdbID === id)
  //   newMovie.splice(index, 1)
  //   setMovie(newMovie)
  // }

  const deleteAll = () => {
    setMovies([])
  }

  const deleteSelected = () => {
    let newMovie = [...movies];
    newMovie = newMovie.filter((item) => !checked.includes(item.imdbID))
    setMovies(newMovie)
    setChecked([])
  }
    
  const updateTitle = (updatedTitle, id) => {
    console.log(id)
    setMovies(
        movies.map((movie) => {
          if (movie.imdbID === id) {
            movie.title = updatedTitle;
          }
          return movie;
        })
  )
}
    return(
        <div className="home">
            <Nav />
        <h1>Movie List</h1>
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={deleteAll}>Delete All</button>
        <List movie={movies}  handleCompleteMovie={handleCompleteMovie} handleCheck={handleCheck} updateTitle={updateTitle} handleWatched={handleWatched}/>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder='Movie'
        required
        value={newMovie}
        onChange={handleChange} />
  
        <button type='submit'>Add Movie</button>
      </form>
      
      </div>
    )
}