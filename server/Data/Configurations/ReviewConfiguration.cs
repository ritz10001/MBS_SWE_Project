namespace server.Data.Configurations;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.HasData(
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
