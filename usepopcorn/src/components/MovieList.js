import Movie from "./Movie";
function MovieList({ movies, handleSelect }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelect={handleSelect} />
      ))}
    </ul>
  );
}

export default MovieList;
