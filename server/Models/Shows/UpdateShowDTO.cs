namespace server.Models.Shows
{
    public class UpdateShowDTO
    {
        public int Id { get; set; }
        public DateTime ShowTime { get; set; }  
        public decimal TicketPrice { get; set; }
        public int TheatreId { get; set; } 
        public int MovieId { get; set; } 
    }
}