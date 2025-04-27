import MovieDetails from '../components/MovieDetails'
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

  return <>
    <title>{`${movieData.title} | MBS`}</title>
    <div className="max-w-5xl mx-auto py-8 px-4">
      <MovieDetails data={movieData} />
      <Reviews data={movieData} />
    </div>
  </>
}

export default MoviePage 