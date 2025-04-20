using Microsoft.EntityFrameworkCore;
using server.Models;

public class Payment
{
    public int Id { get; set; }
    public decimal Amount { get; set; } // Amount paid
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow; // Date and time of the payment
    public string PaymentMethod { get; set; } // e.g., "Credit Card", "Debit Card", "Cash"
    public string TransactionId { get; set; } // Unique identifier for the transaction  
    public string PaymentStatus { get; set; } = "Pending"; // e.g., "Success", "Failed", "Pending"  
    public int BookingId { get; set; } // Foreign key to the Booking table
    public Booking Booking { get; set; } // Reference to the associated booking

}