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
            Shows = m.Shows.Where(s => s.isActive).ToList(),
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
                    UserName = r.User.UserName,
                    Email = r.User.Email
                }
            }).ToList()
        })
        .FirstOrDefaultAsync();
    }
}