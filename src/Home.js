import {useState} from 'react'
import List from './List';
import './Home.css'

export default function Home() {
    // const initialMovie = useEffect(getInitialMovie())

  // function getInitialMovie() {}

  const [movies, setMovies] = useState([{
    title: "Ben: The Movie", genre: "Horror", imdbID: null
  }]);

  const [newMovie, setNewMovie] = useState("")

  const [newUserMovie, setNewUserMovie] = useState({
    title: "", genre: "", imdbID: null
  })

  const [checked, setChecked] = useState([])

  const [counter, setCounter] = useState(1)




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


  const handleChange = (e) => {
    setNewMovie(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
      fetch(`http://omdbapi.com/?t=${newMovie}&apikey=80abee2e&`)
      .then((response) => response.json())
      .then((result) => setMovies([...movies, {title: result.Title, genre: result.Genre, imdbID: result.imdbID, completed: false}]))
    
    
    setNewMovie('')
  }

  const handleUserChange = (e) => {
    // setNewUserMovie({[e.target.name]:e.target.value})
    const {name, value} = e.target;
    setNewUserMovie((prev) => {
        return {...prev, [name]: value}
    })
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    console.log(newUserMovie.title)
    setMovies([...movies, {title: newUserMovie.title, genre:newUserMovie.genre, imdbID: counter}])
    setCounter(counter + 1)
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
           
        <h1>Movie List</h1>
        
        <button onClick={deleteSelected}>Delete Selected</button>
        <button onClick={deleteAll}>Delete All</button>
        <List movies={movies}  handleCompleteMovie={handleCompleteMovie} handleCheck={handleCheck} updateTitle={updateTitle} handleWatched={handleWatched}/>
      <form className='api-form' onSubmit={handleSubmit}>
        <h3>Add Movie From Database</h3>
        <input
        type='text'
        placeholder='Movie'
        required
        value={newMovie}
        onChange={handleChange} />
  
        <button type='submit'>Add Movie</button>
      </form>
      <form className='user-form' onSubmit={handleUserSubmit}>
        <h3>Add Your Own Movie</h3>
        <input
        type='text'
        placeholder='Add your own movie'
        required
        name='title'
        value={newUserMovie.title}
        onChange={handleUserChange} />
        <br/>
        <input
        type='text'
        placeholder='Add the genre'
        required
        name='genre'
        value={newUserMovie.genre}
        onChange={handleUserChange} />
        <br/>
  
        <button type='submit'>Add User Movie</button>
      </form>
      
      </div>
    )
}