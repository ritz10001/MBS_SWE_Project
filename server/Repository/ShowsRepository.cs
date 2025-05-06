using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Models.Shows;
using server.Repository;

namespace server.Repository;

public class ShowsRepository : GenericRepository<Show>, IShowsRepostory
{
    private readonly MBSDbContext _context;
    public ShowsRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Show>> GetAllShowsForMovies(int movieId)
    {
        var shows = await _context.Shows
            .Where(s => s.MovieId == movieId && s.isActive)
            .Include(s => s.Theatre)
            .ToListAsync();
        return shows;
    }

    public async Task<List<Show>> GetAllShows()
    {
        var shows = await _context.Shows
        .Where(s => s.isActive)
        .Include(s => s.Theatre)
        .ToListAsync();
        return shows;
    }

    public async Task<Show> GetShowWithDetails(int id)
    {
        return await _context.Shows
            .Include(s => s.Movie)
            .Include(s => s.Theatre)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

}