using server.Models;

namespace server.Interface;


public interface IMoviesRepository : IGenericRepository<Movie>
{
    Task<Movie> GetMovieWithReviews(int id);
}   