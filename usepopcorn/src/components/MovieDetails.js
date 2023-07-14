import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "../StarRating";
const KEY = "5b5900fc";

function MovieDetails({
  selectedId,
  handleClose,
  setWatched,
  watched,
  setStarRating,
  starRating,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    Actors: actors,
    Awards: Awards,
    Country: country,
    Director: director,
    Genre: genre,
    Language: language,
    Plot: plot,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Title: title,
    Type: type,
    Writer: writer,
    Year: year,
  } = movie;
  useEffect(() => {
    const featchDitails = async () => {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };
    featchDitails();
  }, [selectedId]);

  const handleWatch = () => {
    const watchedObj = {
      runtime,
      imdbID: movie.imdbID,
      year,
      imdbRating: movie.imdbRating,
      userRating: starRating,
      poster,
    };
    setWatched((wat) => (wat = [...watched, watchedObj]));
  };
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {movie.imdbRating}imdb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setStarRating}
              />
              <button className="btn-add" onClick={handleWatch}>
                salam
              </button>
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>starRating {actors}</p>
            <p>directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
