

using server.Models;
using server.Repository;


namespace server.Interface;

public interface ITicketsRepository : IGenericRepository<Ticket>
{
    Task<List<Ticket>> GetTicketsByBookingId(int bookingId);
}