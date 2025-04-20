

namespace Server.Models.Payments;

public class GetPaymentDTO {
    public int Id { get; set; } // Unique identifier for the payment
    public decimal Amount { get; set; } // Amount paid
    public DateTime PaymentDate { get; set; } // Date and time of the payment
    public string PaymentMethod { get; set; } // e.g., "Credit Card", "Debit Card", "Cash"
    public string TransactionId { get; set; } // Unique identifier for the transaction  
    public string Status { get; set; } // e.g., "Success", "Failed", "Pending"  
    public int BookingId { get; set; } // Foreign key to the Booking table
}