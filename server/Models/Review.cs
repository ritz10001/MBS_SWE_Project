using server.Models;

namespace server.Models;

public class Review {
    public int Id { get; set; }  
    public float Rating { get; set; } // e.g., 1 to 5 stars
    public string Comment { get; set; } 
    public DateTime ReviewDate { get; set; }  
    public int MovieId { get; set; } 
    public Movie Movie { get; set; }
}