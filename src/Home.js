import { useState, useEffect } from "react";
import List from "./List";
import SearchBar from "./SearchBar";
import "./Home.css";
import Box from "./Box";
import MovieResults from "./MovieResults";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  // const [newUserMovie, setNewUserMovie] = useState({
  //   title: "",
  //   genre: "",
  //   imdbID: null,
  // });
  const [checked, setChecked] = useState([]);
  // const [counter, setCounter] = useState(1);

  useEffect(() => {
    let pageLoaded = localStorage.getItem("pageLoaded");

    if (pageLoaded !== "true") {
      const setInitialMovies = async () => {
        const titles = ["the terminator", "pulp fiction", "superbad"];
        let titlesFromAPI = [];

        for (let i = 0; i < titles.length; i++) {
          const response = await fetch(
            `https://omdbapi.com/?t=${titles[i]}&apikey=80abee2e&`
          );
          const result = await response.json();
          titlesFromAPI.push({
            title: result.Title,
            genre: result.Genre,
            imdbID: result.imdbID,
            released: result.Released,
            director: result.Director,
            actors: result.Actors,
            poster: result.Poster,
            completed: false,
          });
        }
        setMovies(titlesFromAPI);
        localStorage.setItem("initialData", JSON.stringify(titlesFromAPI));
        localStorage.setItem("pageLoaded", true);
      };
      setInitialMovies();
    } else {
      setMovies(JSON.parse(localStorage.getItem("initialData")));
    }
  }, []);

  const handleCheck = (e, id) => {
    let checkedList = [...checked];
    if (!checked.includes(id)) {
      checkedList = [...checked, id];
    } else {
      const index = checked.findIndex((imdbID) => imdbID === id);
      checkedList.splice(index, 1);
    }
    setChecked(checkedList);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `https://omdbapi.com/?s=${query}&apikey=80abee2e&`
    );
    const results = await response.json();
    console.log(results);
    setMovies(results.Search);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   fetch(`https://omdbapi.com/?t=${query}&apikey=80abee2e&`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setMovies([
  //         ...movies,
  //         {
  //           title: result.Title,
  //           genre: result.Genre,
  //           imdbID: result.imdbID,
  //           released: result.Released,
  //           director: result.Director,
  //           actors: result.Actors,
  //           poster: result.Poster,
  //           completed: false,
  //         },
  //       ]);

  //       localStorage.setItem(
  //         "initialData",
  //         JSON.stringify([
  //           ...movies,
  //           {
  //             title: result.Title,
  //             genre: result.Genre,
  //             imdbID: result.imdbID,
  //             released: result.Released,
  //             director: result.Director,
  //             actors: result.Actors,
  //             poster: result.Poster,
  //             completed: false,
  //           },
  //         ])
  //       );
  //     });
  //   localStorage.setItem("data", movies);
  //   setQuery("");

  //   console.log(JSON.stringify(movies));
  // };

  // const handleUserChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUserMovie((prev) => {
  //     return { ...prev, [name]: value };
  //   });
  // };

  // const handleUserSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(newUserMovie.title);
  //   setMovies([
  //     ...movies,
  //     { title: newUserMovie.title, genre: newUserMovie.genre, imdbID: counter },
  //   ]);
  //   setCounter(counter + 1);
  // };

  const handleCompleteMovie = (id) => {
    setMovies(
      movies.map((movie) => {
        if (movie.imdbID === id) {
          movie.completed = true;
        }
        return movie;
      })
    );
  };

  const handleWatched = (id) => {
    setMovies(
      movies.map((movie) => {
        if (movie.imdbID === id) {
          movie.completed = false;
        }
        return movie;
      })
    );
  };

  const deleteAll = () => {
    setMovies([]);
    localStorage.setItem("initialData", JSON.stringify([]));
  };

  const deleteSelected = () => {
    let newMovie = [...movies];
    newMovie = newMovie.filter((item) => !checked.includes(item.imdbID));
    setMovies(newMovie);
    localStorage.setItem("initialData", JSON.stringify(newMovie));
    setChecked([]);
  };

  const updateTitle = (updatedTitle, id) => {
    setMovies(
      movies.map((movie) => {
        if (movie.imdbID === id) {
          movie.title = updatedTitle;
        }
        return movie;
      })
    );
  };
  return (
    <div className="home">
      <h1>Movie List</h1>

      <SearchBar />

      <button onClick={deleteSelected}>Delete Selected</button>
      <button onClick={deleteAll}>Delete All</button>
      <Box>{MovieResults}</Box>
      <Box>Box 2</Box>
      <List
        movies={movies}
        handleCompleteMovie={handleCompleteMovie}
        handleCheck={handleCheck}
        updateTitle={updateTitle}
        handleWatched={handleWatched}
      />
      <form className="api-form" onSubmit={handleSubmit}>
        <h3>Add Movie From Database</h3>
        <input
          type="text"
          placeholder="Movie"
          required
          value={query}
          onChange={(e) => setQuery(e.value)}
        />

        <button type="submit">Add Movie</button>
      </form>
      {/* <form className="user-form" onSubmit={handleUserSubmit}>
        <h3>Add Your Own Movie</h3>
        <input
          type="text"
          placeholder="Add your own movie"
          required
          name="title"
          value={newUserMovie.title}
          onChange={handleUserChange}
        />
        <br />
        <input
          type="text"
          placeholder="Add the genre"
          required
          name="genre"
          value={newUserMovie.genre}
          onChange={handleUserChange}
        />
        <br />

        <button type="submit">Add User Movie</button>
      </form> */}
    </div>
  );
}
