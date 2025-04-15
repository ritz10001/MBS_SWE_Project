
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class MBSDbContext : DbContext
{
    public MBSDbContext(DbContextOptions<MBSDbContext> options) : base(options)
    {
    }

    public DbSet<Movie> Movies { get; set; } 
    public DbSet<Booking> Booking { get; set; }
    public DbSet<Theatre> Theatres { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<Show> Shows { get; set; } 
    public DbSet<Review> Reviews { get; set; } 
    public DbSet<Payment> Payments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Movie>().HasData(
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
        modelBuilder.Entity<Theatre>().HasData(
            new Theatre {
                Id = 1,
                Name = "Cineplex 1",
                Location = "Lubbock"
            },
            new Theatre {
                Id = 2,
                Name = "Cineplex 2",
                Location = "Amarillo"
            },
            new Theatre {
                Id = 3,
                Name = "Cineplex 3",
                Location = "Levelland"
            },
            new Theatre {
                Id = 4,
                Name = "Cineplex 4",
                Location = "Plainview"
            },
            new Theatre {
                Id = 5,
                Name = "Cineplex 6",
                Location = "Snyder"
            },
            new Theatre {
                Id = 6,
                Name = "Cineplex 6",
                Location = "Abilene"
            }
        );  
        modelBuilder.Entity<Show>().HasData(
            new Show {
                Id = 1,
                ShowTime = new DateTime(2025, 4, 14, 12, 0, 0),
                TicketPrice = 22.00m,
                MovieId = 1,
                TheatreId = 1,
                isActive = true
            },
            new Show {
                Id = 2,
                ShowTime = new DateTime(2025, 4, 14, 15, 0, 0),
                TicketPrice = 22.00m,
                MovieId = 2,
                TheatreId = 2,
                isActive = true
            },
            new Show {
                Id = 3,
                ShowTime = new DateTime(2025, 4, 14, 18, 0, 0),
                TicketPrice = 20.00m,
                MovieId = 3,
                TheatreId = 3,
                isActive = true
            },
            new Show {
                Id = 4,
                ShowTime = new DateTime(2024, 4, 14, 21, 0, 0),
                TicketPrice = 25.00m,
                MovieId = 4,
                TheatreId = 4,
                isActive = true
            },
            new Show {
                Id = 5,
                ShowTime = new DateTime(2024, 4, 15, 12, 0, 0),
                TicketPrice = 30.00m,
                MovieId = 1,
                TheatreId = 5,
                isActive = true
            },
            new Show {
                Id = 6,
                ShowTime = new DateTime(2024, 4, 15, 15, 0, 0),
                TicketPrice = 18.00m,
                MovieId = 2,
                TheatreId = 6,
                isActive = true
            },
            new Show {
                Id = 7,
                ShowTime = new DateTime(2024, 4, 15, 18, 0, 0),
                TicketPrice = 20.00m,
                MovieId = 3,
                TheatreId = 1,
                isActive = true
            },
            new Show {
                Id = 8,
                ShowTime = new DateTime(2024, 4, 15, 21, 0, 0),
                TicketPrice = 25.00m,
                MovieId = 4,
                TheatreId = 1,
                isActive = true
            }
        );
        modelBuilder.Entity<Review>().HasData(
            new Review {
                Id = 1,
                MovieId = 1,
                Rating = 5,
                Comment = "Amazing movie!",
            },
            new Review {
                Id = 2,
                MovieId = 2,
                Rating = 4,
                Comment = "Great action scenes.",
            },
            new Review {
                Id = 3,
                MovieId = 3,
                Rating = 5,
                Comment = "Mind-blowing!",
                
            },
            new Review {
                Id = 4,
                MovieId = 4,
                Rating = 5,
                Comment = "A classic!",
            },
            new Review {
                Id = 5,
                MovieId = 1,
                Rating = 4,
                Comment = "Great concept.",
            },
            new Review {
                Id = 6,
                MovieId = 2,
                Rating = 5,
                Comment = "Best movie of the year.",
            },
            new Review {
                Id = 7,
                MovieId = 3,
                Rating = 4,
                Comment = "Very interesting plot.",
            },
            new Review {
                Id = 8,
                MovieId = 4,
                Rating = 5,
                Comment = "Loved it!",
            }
        );
    }
}