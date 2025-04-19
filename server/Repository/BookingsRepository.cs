using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;

namespace server.Repository;

public class BookingsRepository : GenericRepository<Booking>, IBookingsRepository
{
    private readonly MBSDbContext _context;

    public BookingsRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Booking>> GetBookingsByUserId(string userId)
    {
        return await _context.Booking
            .Where(b => b.UserId == userId)
            .Include(b => b.Show)
            .ThenInclude(s => s.Movie)
            .Include(b => b.Tickets)
            .ToListAsync();
    }
}