using server.Models;

namespace server.Models;

public class Show
{
    public int Id { get; set; } 
    public DateTime ShowTime { get; set; }  
    public decimal TicketPrice { get; set; }
    public bool isActive { get ; set; }
    public int TheatreId { get; set; } 
    public Theatre Theatre { get; set; }
    public int MovieId { get; set; } 
    public Movie Movie { get; set; }
    public ICollection<Booking> Bookings { get; set; } // List of bookings for this show
}