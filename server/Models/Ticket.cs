using server.Models;

namespace server.Models;

public class Ticket {
    public int Id { get ; set; }
    public string TicketCode { get; set; } = string.Empty; // Unique code for the ticket
    public bool IsScanned { get; set; }
    public Booking Booking { get; set; }
    public int BookingId { get; set; }
    public DateTime IssueDate { get; set; } = DateTime.UtcNow; // Default to current date and time 

}