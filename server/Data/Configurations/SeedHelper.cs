using System.Threading.Tasks;
using server.Models;

namespace server.Data.Configurations;

public static class SeedHelper {
    public static async Task SeedMoviesAndShowsAsync(MBSDbContext context)
    {
        if (context.Movies.Any()) return; // Skip if movies already exist

        var movies = GetPreGeneratedMovies();
        await context.Movies.AddRangeAsync(movies);
        await context.SaveChangesAsync(); // Required before assigning FK-based shows

        var shows = GenerateShowsForNextFewDays(movies, theatreCount: 6, days: 3);
        await context.Shows.AddRangeAsync(shows);
        await context.SaveChangesAsync();
    }
    private static List<Movie> GetPreGeneratedMovies() {
    
        return new List<Movie>
        {
            new Movie
            {
                Title = "Edge of Tomorrow",
                Description = "A soldier relives the same day...",
                Duration = 113,
                Director = "Doug Liman",
                Cast = "Tom Cruise, Emily Blunt",
                Rating = 7.9f,
                Genre = "Sci-Fi",
                ReleaseDate = new DateTime(2014, 6, 6),
                ImageUrl = "https://image.tmdb.org/t/p/example.jpg",
                isActive = true
            },
        };    
    }
    private static List<Show> GenerateShowsForNextFewDays(List<Movie> movies, int theatreCount, int days)
    {
        var shows = new List<Show>();
        var rnd = new Random();
        
        var baseShowTimes = new[] { 10, 13, 16, 19 }; // 10am, 1pm, 4pm, 7pm (more natural gaps)

        foreach (var movie in movies)
        {
            for (int theatreId = 1; theatreId <= theatreCount; theatreId++)
            {
                for (int dayOffset = 0; dayOffset < days; dayOffset++)
                {
                    int baseHour = baseShowTimes[rnd.Next(baseShowTimes.Length)];

                    // Small random offset: between -15 to +30 minutes
                    int minuteOffset = rnd.Next(-15, 31); // -15, 0, +15, +30 min

                    // Adjusted showtime
                    var showTime = DateTime.Today
                        .AddDays(dayOffset)
                        .AddHours(baseHour)
                        .AddMinutes(minuteOffset);

                    var show = new Show
                    {
                        ShowTime = showTime,
                        TicketPrice = 15 + rnd.Next(0, 11),
                        isActive = true,
                        TheatreId = theatreId,
                        MovieId = movie.Id
                    };

                    shows.Add(show);
                }
            }
        }

        return shows;
    }

}