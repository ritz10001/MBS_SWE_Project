

using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Repository;

namespace Server.Repository;

public class TicketsRepository : GenericRepository<Ticket>, ITicketsRepository
{
    private readonly MBSDbContext _context;
    public TicketsRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<List<Ticket>> GetTicketsByBookingId(int bookingId)
    {
        return await _context.Tickets
            .Where(t => t.BookingId == bookingId)
            .ToListAsync();
    }
}