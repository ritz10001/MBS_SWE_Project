using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Microsoft.EntityFrameworkCore;

using server.Models;

namespace server.Data.Configurations;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.HasData(
            new Movie {
                Id = 1,
                Title = "Inception",
                Description = "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
                Duration = 148,
                Director = "Christopher Nolan",
                Cast = "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
                Rating = 8.8f,
                Genre = "Sci-Fi",
                ReleaseDate = new DateTime(2010, 7, 16),
                ImageUrl = "https://example.com/inception.jpg",
                isActive = true
            },
            new Movie {
                Id = 2,
                Title = "The Dark Knight",
                Description = "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
                Duration = 152,
                Director = "Christopher Nolan",
                Cast = "Christian Bale, Heath Ledger, Aaron Eckhart",
                Rating = 9.0f,
                Genre = "Action",
                ReleaseDate = new DateTime(2008, 7, 18),
                ImageUrl = "https://example.com/dark_knight.jpg",
                isActive = true
            },
            new Movie {
                Id = 3,
                Title = "Interstellar",
                Description = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                Duration = 169,
                Director = "Christopher Nolan",
                Cast = "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
                Rating = 8.6f,
                Genre = "Adventure",
                ReleaseDate = new DateTime(2014, 11, 7),
                ImageUrl = "https://example.com/interstellar.jpg",
                isActive = true
            },
            new Movie {
                Id = 4,
                Title = "The Matrix",
                Description = "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                Duration = 136,
                Director = "Lana Wachowski, Lilly Wachowski",
                Cast = "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
                Rating = 8.7f,
                Genre = "Action",
                ReleaseDate = new DateTime(1999, 3, 31),
                ImageUrl = "https://example.com/matrix.jpg",
                isActive = true
            }
        );
    }
}