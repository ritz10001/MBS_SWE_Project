using server.Models;
using server.Models.Shows;

namespace server.Interface;

public interface IShowsRepostory : IGenericRepository<Show> {
    Task<Show> GetShowWithDetails(int id);
    Task<List<Show>> GetAllShowsForMovies(int movieId);
    Task<List<Show>> GetAllShows();
}