using server.Models.Reviews;

namespace server.Models.Movies;

public class BaseMovieDTO {
    public string Title { get; set; }     
    public int Duration { get; set; } // Duration in minutes
    public string Director { get; set; }
    public float Rating { get; set; }
    public string Genre { get; set; }
    public DateTime ReleaseDate { get; set; }  
    public string ImageUrl { get; set; }
}