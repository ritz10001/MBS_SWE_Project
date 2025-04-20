
namespace server.Models.Payments;

public class CreatePaymentDTO {
    public string PaymentMethod { get; set; } // e.g., "Credit Card", "Debit Card", "Cash"
    public int NumberOfTickets { get; set; } // Number of tickets booked
    public int ShowId { get; set; } // Show ID for the booking
    public string CardHolderName { get; set; } = string.Empty; // Name on the card  
    public string CardNumber { get; set; } = string.Empty; // Card number
    public string ExpiryDate { get; set; } = string.Empty; // Expiry date in MM/YY format
    public string CVV { get; set; } = string.Empty; // CVV code
}