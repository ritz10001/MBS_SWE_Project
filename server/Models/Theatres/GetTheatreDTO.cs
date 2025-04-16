using server.Models.Shows;

namespace server.Models.Theatres;

public class GetTheatreDTO
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public string Location { get; set; }
    public List<GetShowDTO> Shows { get; set; }
}
