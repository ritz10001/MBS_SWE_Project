using server.Models;

namespace server.Models;

public class Booking {
    public int Id { get; set; } 
    public DateTime BookingDate { get; set; }  
    public decimal TotalAmount { get; set; }
    public string PaymentStatus { get; set; } // e.g., "Credit Card", "Debit Card", "Cash"
    public int ShowId { get; set; } 
    public Show Show { get; set; }
    public ICollection<Ticket> Tickets { get; set; } // List of tickets associated with this booking
    public Payment Payment { get; set; } // Reference to the associated payment
}