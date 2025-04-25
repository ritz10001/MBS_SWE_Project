public class TMDbMovieDTO {
    public string Title { get; set; }
    public string Overview { get; set; }
    public int Runtime { get; set; }
    public float? Vote_Average { get; set; }
    public string ReleaseDate { get; set; }
    public string PosterPath { get; set; }
    public List<Genre> Genres { get; set; }
}

public class Genre {
    public int Id { get; set; }
    public string Name { get; set; }
}

public class CreditsDTO {
    public List<CastMember> Cast { get; set; }
    public List<CrewMember> Crew { get; set; }
}

public class CastMember {
    public string Name { get; set; }
    public int? Order { get; set; } // Lower order = higher billing
}

public class CrewMember {
    public string Name { get; set; }
    public string? Job { get; set; }
}
