using System.ComponentModel.DataAnnotations;

namespace server.Models.Movies
{
    public class CreateMovieDTO
    {
        public string Title { get; set; }    
        public string Description { get; set; }  
        public int Duration { get; set; } // Duration in minutes
        public string Director { get; set; }
        public string Cast { get; set; }
        public float Rating { get; set; }
        public string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }  
        public string ImageUrl { get; set; } // URL to the movie poster or image
    }
}