using server.Data;
using server.Models;

namespace server.Models;

public class Booking {
    public int Id { get; set; } 
    public DateTime BookingDate { get; set; } = DateTime.Now; // Default to current date and time
    public decimal TotalAmount { get; set; }
    public int NumberOfTickets { get; set; } // Number of tickets booked
    public string PaymentStatus { get; set; } 
    public int ShowId { get; set; } 
    public Show Show { get; set; }
    public ICollection<Ticket>? Tickets { get; set; } // List of tickets associated with this booking
    public Payment? Payment { get; set; } // Reference to the associated payment
    public int? PaymentId { get; set; } // Foreign key to the Payment table
    public string? UserId { get; set; } // Assuming you have a User model
    public User? User { get; set; } // Reference to the user who made the booking
}