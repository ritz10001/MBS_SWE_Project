

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Data.Configurations;

public class TheatreConfiguration : IEntityTypeConfiguration<Theatre>
{
    public void Configure(EntityTypeBuilder<Theatre> builder)
    {
        builder.HasData(
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
    }
}