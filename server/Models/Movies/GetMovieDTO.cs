using System.ComponentModel.DataAnnotations;
using server.Models.Reviews;
using server.Models.Shows;

namespace server.Models.Movies;

public class GetMovieDTO : BaseMovieDTO {
    public int Id { get; set; }
    public string Description { get; set; }  
    public string Cast { get; set; }

    // URL to the movie poster or image
    // public List<GetShowDTO> Shows { get; set; } // List of shows for this movie
    public List<GetReviewDTO> Reviews { get; set; }
}