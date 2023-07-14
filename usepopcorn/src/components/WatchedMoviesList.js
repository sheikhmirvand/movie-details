import WatchedMovie from "./WatchedMovie";
function WatchedMoviesList({ watched, starRating }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          starRating={starRating}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
