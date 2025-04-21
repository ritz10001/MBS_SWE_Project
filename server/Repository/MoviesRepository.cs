using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;

namespace server.Repository;

public class MoviesRepository : GenericRepository<Movie>, IMoviesRepository
{
    private readonly MBSDbContext _context;
    public MoviesRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Movie?> GetMovieWithReviews(int id)
    {
        return await _context.Movies
        .Where(m => m.Id == id)
        .Include(m => m.Reviews)                 // <-- load Reviews
            .ThenInclude(r => r.User)            // <-- load User inside each Review
        .Include(m => m.Shows)                   // <-- load Shows
            .ThenInclude(s => s.Theatre)  
        .Select(m => new Movie
        {
            Id = m.Id,
            Title = m.Title,
            Description = m.Description,
            Duration = m.Duration,
            Director = m.Director,
            Cast = m.Cast,
            Rating = m.Rating,
            Genre = m.Genre,
            ReleaseDate = m.ReleaseDate,
            ImageUrl = m.ImageUrl,
            Shows = m.Shows.Select(s => new Show
            {
                Id = s.Id,
                ShowTime = s.ShowTime,
                TicketPrice = s.TicketPrice,
                isActive = s.isActive,
                TheatreId = s.TheatreId,
                Theatre = new Theatre
                {
                    Id = s.Theatre.Id,
                    Name = s.Theatre.Name,
                    Location = s.Theatre.Location
                },
                Movie = new Movie
                {
                    Title = s.Movie.Title,
                    Description = s.Movie.Description,
                    Duration = s.Movie.Duration,
                    ImageUrl = s.Movie.ImageUrl
                }
            }).ToList(),
            Reviews = m.Reviews.Select(r => new Review
            {
                Id = r.Id,
                UserId = r.UserId,
                MovieId = r.MovieId,
                Comment = r.Comment,
                Rating = r.Rating,
                ReviewDate = r.ReviewDate,
                User = new User
                {
                    Id = r.User.Id,
                    FirstName = r.User.FirstName
                }
            }).ToList()
        })
        .FirstOrDefaultAsync();
    }
}