using System.ComponentModel.DataAnnotations;

namespace server.Models.Movies;

public class GetMoviesDTO : BaseMovieDTO
{
    public int Id { get; set; }
}