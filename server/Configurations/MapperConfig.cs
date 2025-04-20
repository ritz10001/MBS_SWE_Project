using AutoMapper;
using server.Data;
using server.Models;
using server.Models.Bookings;
using server.Models.Movies;
using server.Models.Reviews;
using server.Models.Shows;
using server.Models.Theatres;
using server.Models.Tickets;
using server.Models.Users;

namespace server.Configurations;

public class MapperConfig : Profile {
    public MapperConfig() {
        CreateMap<Movie, CreateMovieDTO>().ReverseMap();
        CreateMap<Movie, GetMovieDTO>().ReverseMap();
        CreateMap<Movie, GetMoviesDTO>().ReverseMap();
        CreateMap<Movie, UpdateMovieDTO>().ReverseMap();  
        CreateMap<Show, GetShowDTO>().ReverseMap();
        CreateMap<Show, CreateShowDTO>().ReverseMap();
        CreateMap<Show, GetShowsDTO>().ReverseMap();
        CreateMap<Theatre, GetTheatresDTO>().ReverseMap();
        CreateMap<Theatre, GetTheatreDTO>().ReverseMap();
        CreateMap<Review, CreateReviewDTO>().ReverseMap();  
        CreateMap<Review, UpdateReviewDTO>().ReverseMap();
        CreateMap<Review, GetReviewDTO >().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<Booking, GetBookingsDTO>()
        .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Show.Movie.Title))
        .ForMember(dest => dest.ShowTime, opt => opt.MapFrom(src => src.Show.ShowTime))
        .ForMember(dest => dest.NumberOfTickets, opt => opt.MapFrom(src => src.Tickets.Count));
        CreateMap<Booking, GetBookingDTO>()
        .ForMember(dest => dest.MovieTitle, opt => opt.MapFrom(src => src.Show.Movie.Title))
        .ForMember(dest => dest.ShowTime, opt => opt.MapFrom(src => src.Show.ShowTime));
        CreateMap<Booking, CreateBookingDTO>().ReverseMap();
        CreateMap<Ticket, GetTicketsDTO>().ReverseMap();
    }
}