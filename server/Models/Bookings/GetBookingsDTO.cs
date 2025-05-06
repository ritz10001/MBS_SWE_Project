

namespace server.Models.Bookings;

public class GetBookingsDTO
{
    public int Id { get; set; }
    public DateTime BookingDate { get; set; }
    public int NumberOfTickets { get; set; }    
    public string TheaterName { get; set; }
    public string TheaterLocation { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime ShowTime { get; set; }
    public string MovieTitle { get; set; }
    public string? UserId { get; set; }
}
