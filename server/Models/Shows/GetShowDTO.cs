using System.ComponentModel.DataAnnotations;

namespace server.Models.Shows;

public class GetShowDTO {
    public int Id { get; set; }
    public DateTime ShowTime { get; set; }
    public decimal TicketPrice { get; set; }
    public bool isActive { get; set; }
    public string TheatreName { get; set; }
    public string TheatreLocation { get; set; }
    public string MovieTitle { get; set; }
    public string MovieDescription { get; set; }
    public string MovieImageUrl { get; set; }
    public int MovieDuration { get; set; }
}