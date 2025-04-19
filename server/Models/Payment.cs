using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Models;

public class Payment {
    public int Id { get; set; }
    public string PaymentMethod { get; set; } // e.g., "Credit Card", "Debit Card", "Cash"

    public string TransactionId { get; set; } // Unique identifier for the transaction  
    public string Status { get; set; } // e.g., "Success", "Failed", "Pending"  
    public DateTime PaymentDate { get; set; } // Date and time of the payment
    public Booking Booking { get; set; } // Reference to the associated booking
    public int BookingId { get; set; } // Foreign key to the Booking table

}