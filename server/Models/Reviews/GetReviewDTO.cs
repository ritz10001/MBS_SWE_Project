using System.ComponentModel.DataAnnotations;

namespace server.Models.Reviews;

public class GetReviewDTO {
    public int Id { get; set; }  
    public float Rating { get; set; } 
    public string Comment { get; set; } 
    public DateTime ReviewDate { get; set; }  
    public int MovieId { get; set; } 
}
