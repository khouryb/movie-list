import {useState, useEffect} from 'react'
import List from './List';
import "./App.css"


function App() {

  // const initialMovie = useEffect(getInitialMovie())

  // function getInitialMovie() {}

  const [movies, setMovies] = useState([]);

  const [newMovie, setNewMovie] = useState("")

  const handleChange = (e) => {
    setNewMovie(e.target.value)
  }
  const [checked, setChecked] = useState([])

  const handleCheck = (id) => {
    let checkedList = [...checked]
    if (!checkedList.includes(id)){
      checkedList = [...checked, id]}
    else {
      const index = checked.findIndex((movie) => movie.imdbID === id)
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

  const handleCompleteMovie = (index) => {
    const newMovie = [...movies]
    newMovie[index].completed = true
    setMovies(newMovie)
  }

  // const handleDeleteMovie = (id) => {
  //   const newMovie = [...movie];
  //   const index = newMovie.findIndex((movie) => movie.imdbID === id)
  //   newMovie.splice(index, 1)
  //   setMovie(newMovie)
  // }

  const handleDeleteMovies = (array) => {
    const newMovie = [...movies];
     
    array.forEach(id => {
      const index = newMovie.findIndex((movie) => movie.imdbID === id)
      newMovie.splice(index, 1)
    });
    setMovies(newMovie)
  }

  const deleteAll = () => {
    setMovies([])
  }

  const deleteSelected = () => {
    let moviesTemp = movies;
    const checkedTemp = checked;
    for (let i=0; i<movies.length; i++) {
      for (let j=0; j<checked.length; j++)
      if (movies[i].imdbID === checked[j]) {
        moviesTemp.splice(i, 1)
      }
    }
    
    setMovies(moviesTemp)
    setChecked([])
  }

  return (
    <div className="App">
      <h1>Movie List</h1>
      <button onClick={deleteSelected}>Delete Selected</button>
      <List movie={movies} handleDeleteMovies={handleDeleteMovies} handleCompleteMovie={handleCompleteMovie} handleCheck={handleCheck}/>
    <form onSubmit={handleSubmit}>
      <input
      type='text'
      placeholder='Movie'
      value={newMovie}
      onChange={handleChange} />

      {/* <input
        type='text'
        placeholder='Date'
       /> */}

      <button type='submit'>Add Movie</button>
    </form>
    <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
