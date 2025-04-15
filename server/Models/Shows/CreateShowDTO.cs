using System.ComponentModel.DataAnnotations;

namespace server.Models.Shows;

public class CreateShowDTO {
    public DateTime ShowTime { get; set; }
    public decimal TicketPrice { get; set; }
    public int TheatreId { get; set; }
    public int MovieId { get; set; }
}