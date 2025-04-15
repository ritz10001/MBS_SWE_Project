using server.Models;

namespace server.Interface;

public interface IShowsRepostory : IGenericRepository<Show> {
    Task<Show> GetShowWithDetails(int id);
}