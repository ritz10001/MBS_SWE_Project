public class TMDbMovieDTO {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Overview { get; set; }
    public int Runtime { get; set; }
    public float? Vote_Average { get; set; }
    public string ReleaseDate { get; set; }
    public string PosterPath { get; set; }
    public List<TMDbGenre> Genres { get; set; }
}

public class TMDbGenre {
    public int Id { get; set; }
    public string Name { get; set; }
}

