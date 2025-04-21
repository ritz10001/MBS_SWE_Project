
namespace server.Models.Payments;
public class PaymentResponseDTO {
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string PaymentMethod { get; set; }
    public string TransactionId { get; set; }
    public string PaymentStatus { get; set; }
    public int BookingId { get; set; }
}