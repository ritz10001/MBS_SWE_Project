using System.ComponentModel.DataAnnotations;

namespace server.Models.Reviews;

public class CreateReviewDTO {
    public float Rating { get; set; } 
    public string Comment { get; set; } 
    public int MovieId { get; set; } 
}