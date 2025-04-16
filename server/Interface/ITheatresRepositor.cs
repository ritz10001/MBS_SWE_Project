using server.Models;

namespace server.Interface;

public interface ITheatresRepository : IGenericRepository<Theatre>
{
    Task<List<Movie>> GetTheatreWithMovies(int id);
}