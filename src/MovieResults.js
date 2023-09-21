import React from "react";
import Movie from "./Movie";

export default function MovieResults(movies) {
  return (
    <div>
      {movies.map((movie) => (
        <Movie movie={movie} />
      ))}
    </div>
  );
}
