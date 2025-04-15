using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;

namespace server.Repository;

public class MoviesRepository : GenericRepository<Movie>, IMoviesRepository
{
    private readonly MBSDbContext _context;
    public MoviesRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Movie> GetMovieWithReviews(int id)
    {
        return await _context.Movies
        .Include(q => q.Reviews)
        .FirstOrDefaultAsync(q => q.Id == id);
    }
}