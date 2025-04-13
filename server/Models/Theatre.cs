using server.Models;

namespace server.Models;

public class Theatre {
    public int Id;
    public string Name;
    public string Location;
    public ICollection<Show> Shows;
}