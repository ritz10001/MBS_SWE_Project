namespace server.Models.Shows
{
    public class GetShowsDTO
    {
        public int Id { get; set; } 
        public DateTime ShowTime { get; set; }  
        public decimal TicketPrice { get; set; }
        public bool isActive { get ; set; }
        public int TheatreId { get; set; } 
        public int MovieId { get; set; } 
        public string TheatreName { get; set;}
        public string Location { get; set; }
        
    }
}   