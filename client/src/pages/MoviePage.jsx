import MovieDetails from '../components/MovieDetails'
import Showtimes from '../components/Showtimes'
import Reviews from '../components/Reviews'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import LoadingCircle from '../components/LoadingCircle'

const MoviePage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:5168/api/movies/${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch movie data');
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error(error);
        navigate('/404', { replace: true });
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieData) return <div className="flex justify-center py-40"><LoadingCircle className="w-8 h-8"/></div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <MovieDetails data={movieData} />
      <Showtimes movieId={movieId} />
      <Reviews movieId={movieId} />
    </div>
  )
}

export default MoviePage 