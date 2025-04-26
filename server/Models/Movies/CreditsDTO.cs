namespace server.DTOs;

public class CreditsDTO
{
    public List<CastMember> Cast { get; set; }
    public List<CrewMember> Crew { get; set; }
}

public class CastMember
{
    public string Name { get; set; }
    public int? Order { get; set; }
}

public class CrewMember
{
    public string Name { get; set; }
    public string? Job { get; set; }
}
