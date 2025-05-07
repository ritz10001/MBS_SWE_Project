import { NavLink, useLocation, useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import LoadingCircle from '../components/LoadingCircle'
import Button from '../components/Button';

const MovieListPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const searchTerm = params.get('search');
  const genreFilter = params.get('genre');
  const timeFilter = params.get('time');
  const showAll = params.get('showAll');

  const isHome = !searchTerm && !genreFilter && !timeFilter && !showAll;

  const [moviesData, setMoviesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch(`https://www.moviebookingsystem.xyz/api/movies`);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        setMoviesData(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchMoviesData();
  }, []);

  if (!moviesData) return <div className="flex justify-center py-40"><LoadingCircle className="w-8 h-8"/></div>;

  const currentMovies = moviesData.filter(movie => Date.now() > new Date(movie.releaseDate).getTime());
  const upcomingMovies = moviesData.filter(movie => Date.now() < new Date(movie.releaseDate).getTime());

  const filteredMovies = showAll ? moviesData : moviesData.filter(movie => {
    const matchesSearch = searchTerm ? movie.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesGenre = genreFilter ? movie.genre.toLowerCase() === genreFilter.toLowerCase() : true;
    let matchesTime = true;
    if (timeFilter == 'current') matchesTime = Date.now() > new Date(movie.releaseDate).getTime();
    else if (timeFilter == 'upcoming') matchesTime = Date.now() < new Date(movie.releaseDate).getTime();
    return matchesSearch && matchesGenre && matchesTime;
  });

  return <>
    <title>Browse Movies | MBS</title>
    <div className="max-w-5xl mx-auto py-8 px-4">
      {error ? (
        <div className="col-span-full text-center text-red-500">Failed to load movies, try refreshing the page</div>
      ) : (
        isHome ? (
          <>
            <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2">Current Movies</h2>
            {currentMovies.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No current movies found</div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
                  {currentMovies.slice(0, 10).map((movie, index) => (
                    <NavLink key={movie.id} to={`/movie/${movie.id}`} className={`rounded-xl bg-[#ececec] shadow-xl hover:transform hover:scale-105 transition-transform duration-300 ${index > 7 ? 'hidden xl:block' : index > 5 ? 'hidden lg:block' : index > 3 ? 'hidden md:block' : 'block'}`}>
                      <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto rounded-t-xl aspect-[2/3]" />
                      <div className="px-4 py-3">
                        <h2 className="text-lg font-bold text-black">{movie.title}</h2>
                        <p className="text-gray-500">{new Date(movie.releaseDate).getFullYear()}</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                <Button
                  variant="primary"
                  href="/?time=current"
                >
                  See All Current Movies
                </Button>
              </>
            )}

            <h2 className="text-xl md:text-2xl font-bold text-black pb-2 border-b border-gray-500 mb-2 mt-12">Upcoming Movies</h2>
            {upcomingMovies.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No current movies found</div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
                  {upcomingMovies.slice(0, 10).map((movie, index) => (
                    <NavLink key={movie.id} to={`/movie/${movie.id}`} className={`rounded-xl bg-[#ececec] shadow-xl hover:transform hover:scale-105 transition-transform duration-300 ${index > 7 ? 'hidden xl:block' : index > 5 ? 'hidden lg:block' : index > 3 ? 'hidden md:block' : 'block'}`}>
                      <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto rounded-t-xl aspect-[2/3]" />
                      <div className="px-4 py-3">
                        <h2 className="text-lg font-bold text-black">{movie.title}</h2>
                        <p className="text-gray-500">{new Date(movie.releaseDate).getFullYear()}</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                <Button
                  variant="primary"
                  href="/?time=upcoming"
                >
                  See All Upcoming Movies
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">{searchTerm ? `Search Results for '${searchTerm}'` : `Browse ${genreFilter ?? 'All'}${timeFilter ? ` ${timeFilter.charAt(0).toUpperCase()}${timeFilter.substring(1)}` : ''} Movies`}</h1>
              <div>Showing {filteredMovies.length} result{filteredMovies.length == 1 ? '' : 's'}</div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {filteredMovies.length === 0 && (
                  <div className="col-span-full text-center text-gray-500">No movies found</div>
                )}
                {filteredMovies.map(movie => (
                  <NavLink key={movie.id} to={`/movie/${movie.id}`} className="rounded-xl bg-[#ececec] shadow-xl hover:transform hover:scale-105 transition-transform duration-300">
                    <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto rounded-t-xl aspect-[2/3]" />
                    <div className="px-4 py-3">
                      <h2 className="text-lg font-bold text-black">{movie.title}</h2>
                      <p className="text-gray-500">{new Date(movie.releaseDate).getFullYear()}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
          </>
        )
      )}
    </div>
  </>
}

export default MovieListPage 