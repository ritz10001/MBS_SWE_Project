namespace server.Models.Bookings;
public class CreateBookingDTO
{
    public int ShowId { get; set; } // ID of the show being booked
    public int NumberOfTickets { get; set; } // Number of tickets to be booked
}
