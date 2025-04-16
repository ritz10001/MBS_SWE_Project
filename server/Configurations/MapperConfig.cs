using AutoMapper;
using server.Models;
using server.Models.Movies;
using server.Models.Reviews;
using server.Models.Shows;
using server.Models.Theatres;

namespace server.Configurations;

public class MapperConfig : Profile {
    public MapperConfig() {
        CreateMap<Movie, CreateMovieDTO>().ReverseMap();
        CreateMap<Movie, GetMovieDTO>().ReverseMap();
        CreateMap<Movie, GetMoviesDTO>().ReverseMap();
        CreateMap<Movie, UpdateMovieDTO>().ReverseMap();  
        CreateMap<Review, GetReviewDTO >().ReverseMap();
        CreateMap<Show, GetShowDTO>().ReverseMap();
        CreateMap<Show, CreateShowDTO>().ReverseMap();
        CreateMap<Show, GetShowsDTO>().ReverseMap();
        CreateMap<Theatre, GetTheatresDTO>().ReverseMap();
        CreateMap<Theatre, GetTheatreDTO>().ReverseMap();
    }
}