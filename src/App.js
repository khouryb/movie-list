import {useState, useEffect} from 'react'
import "./App.css"


function App() {

  // const initialMovie = useEffect(getInitialMovie())

  // function getInitialMovie() {}

  const [movie, setMovie] = useState([]);

  const [newMovie, setNewMovie] = useState("")

  const handleChange = (e) => {
    setNewMovie(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://omdbapi.com/?t=${newMovie}&apikey=80abee2e&`)
    .then((response) => response.json())
    .then((result) => setMovie([...movie, {title: result.Title, genre: result.Genre, completed: false}]))
    console.log(movie)
    setNewMovie('')
  }

  const handleCompleteMovie = (index) => {
    const newMovie = [...movie]
    newMovie[index].completed = true
    setMovie(newMovie)
  }

  const handleDeleteMovie = (index) => {
    const newmovie = [...movie];
    newmovie.splice(index, 1)
    setMovie(newmovie)
  }

  const deleteAll = () => {
    setMovie([])
  }


  return (
    <div className="App">
      <h1>Movie List</h1>
    <div>
      {
        movie.map((item, index) => (
          <div key={index}>
          <p className={item.completed ? 'completed' : null}>
            {item.title}{item.genre}
          </p>
          <input type='checkbox' value={index}/>
          {
            item.completed ? (
              <button onClick={() => handleDeleteMovie(index)}>Delete</button>
            ) : (
              <button onClick={() => handleCompleteMovie(index)}>Complete</button>
            )
          }
          
            </div>
        ))
      }
    </div>
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

      <button>Add Movie</button>
    </form>
    <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
