using server.Models;

namespace server.Interface;

public interface IBookingsRepository : IGenericRepository<Booking>
{
    Task<IEnumerable<Booking>> GetAllBookings();
    Task<IEnumerable<Booking>> GetBookingsByUserId(string userId);
    Task<Booking> GetBookingById(int id);
}