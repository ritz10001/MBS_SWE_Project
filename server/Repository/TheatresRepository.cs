using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;


namespace server.Repository;

public class TheatresRepository : GenericRepository<Theatre>, ITheatresRepository
{
    private readonly MBSDbContext _context;
    public TheatresRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Movie>> GetTheatreWithMovies(int id)
    {
        return await _context.Shows
        .Where(s => s.TheatreId == id)
        .Select(s => s.Movie)
        .Distinct()
        .ToListAsync();
    }

}