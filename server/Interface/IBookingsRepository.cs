using server.Models;

namespace server.Interface;

public interface IBookingsRepository : IGenericRepository<Booking>
{
    Task<IEnumerable<Booking>> GetBookingsByUserId(string userId);
}