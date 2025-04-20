
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Data.Configurations;
using server.Models;

namespace server.Data;

public class MBSDbContext : IdentityDbContext<User>
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
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Payment)
            .WithOne(p => p.Booking)
            .HasForeignKey<Payment>(p => p.BookingId) // Assuming BookingId is the foreign key in Payment
            .OnDelete(DeleteBehavior.Cascade); // Optional: specify delete behavior
        
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new RoleConfiguration());
        modelBuilder.ApplyConfiguration(new MovieConfiguration());
        modelBuilder.ApplyConfiguration(new TheatreConfiguration());
        modelBuilder.ApplyConfiguration(new ShowConfiguration());
        modelBuilder.ApplyConfiguration(new ReviewConfiguration());  
    }
}