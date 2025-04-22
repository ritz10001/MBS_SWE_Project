import MovieDetails from '../components/MovieDetails'
import Showtimes from '../components/Showtimes'
import Reviews from '../components/Reviews'

const MoviePage = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <MovieDetails />
      <Showtimes />
      <Reviews />
    </div>
  )
}

export default MoviePage 