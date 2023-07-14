import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import MovieList from "./components/MovieList";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Box from "./components/Box";
import Loader from "./components/Loader";
import Main from "./components/Main";
import ErrorMessage from "./components/ErrorMessage";
import NumResults from "./components/NumResults";

const KEY = "5b5900fc";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [starRating, setStarRating] = useState();

  useEffect(() => {
    const featchData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("movie not found");
        setMovies(data.Search);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    featchData();
  }, [query]);

  const handleSelect = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  };

  const handleClose = () => {
    setSelectedId(null);
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} handleSelect={handleSelect} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleClose={handleClose}
              setWatched={setWatched}
              watched={watched}
              setStarRating={setStarRating}
              starRating={starRating}
            />
          ) : (
            <>
              {" "}
              <WatchedSummary watched={watched} starRating={starRating} />
              <WatchedMoviesList watched={watched} starRating={starRating} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/
