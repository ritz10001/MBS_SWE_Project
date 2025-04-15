using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Repository;

namespace server.Repository;

public class ShowsRepository : GenericRepository<Show>, IShowsRepostory
{
    private readonly MBSDbContext _context;
    public ShowsRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Show> GetShowWithDetails(int id)
    {
        return await _context.Shows
            .Include(s => s.Movie)
            .Include(s => s.Theatre)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

}