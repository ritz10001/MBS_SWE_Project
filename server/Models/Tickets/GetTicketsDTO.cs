
namespace server.Models.Tickets;

public class GetTicketsDTO
{
    public int Id { get; set; }
    public string TicketCode { get; set; }
    public DateTime IssueDate { get; set; }
}