
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class User : IdentityUser {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public ICollection<Review>? Reviews { get; set; } // List of reviews made by the user
    public ICollection<Booking>? Bookings { get; set; } // List of bookings made by the user
}