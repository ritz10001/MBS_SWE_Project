namespace server.Data.Configurations;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

public class ShowConfiguration : IEntityTypeConfiguration<Show>
{
    public void Configure(EntityTypeBuilder<Show> builder)
    {
        builder.HasData(
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
    }
}
