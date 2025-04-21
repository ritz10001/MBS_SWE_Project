using System.ComponentModel.DataAnnotations.Schema;
using server.Data;
using server.Models;

namespace server.Models;

public class Review {
    public int Id { get; set; }  
    public double Rating { get; set; } // e.g., 1 to 5 stars
    public string Comment { get; set; } 
    public DateTime ReviewDate { get; set; } = DateTime.UtcNow;
    public int MovieId { get; set; } 
    public Movie Movie { get; set; }
    public string? UserId { get; set; }
    public User? User { get; set; } // Assuming you have a User model
}