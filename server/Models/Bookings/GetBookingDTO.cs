

using server.Models.Tickets;

namespace server.Models.Bookings;

public class GetBookingDTO
{
    public int Id { get; set; }
    public DateTime BookingDate { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime ShowTime { get; set; }
    public string MovieTitle { get; set; }
    public List<GetTicketsDTO> Tickets { get; set; } = new List<GetTicketsDTO>();   
}
