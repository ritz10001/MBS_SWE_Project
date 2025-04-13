
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
}