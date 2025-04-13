using server.Models;

namespace server.Models;

public class Ticket {
    public int Id { get ; set; }
    public string TicketCode { get; set; }
    public bool isScanned { get; set; }
    public Booking Booking { get; set; }
    public int BookingId { get; set; }

}