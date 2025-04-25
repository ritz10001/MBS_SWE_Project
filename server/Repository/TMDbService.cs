using RestSharp;

namespace server.Repository;

public class TMDbService
{
    private readonly RestClient _client;
    private readonly IConfiguration _configuration;

    public TMDbService(IConfiguration configuration)
    {
        _configuration = configuration;
        var options = new RestClientOptions("https://api.themoviedb.org/3/")
        {
            ThrowOnAnyError = true
        };
        _client = new RestClient(options);
    }

    public async Task DiscoverMoviesAsync()
    {
        var request = new RestRequest("discover/movie", Method.Get);
        request.AddHeader("accept", "application/json");
        request.AddHeader("Authorization", $"Bearer {_configuration["TMDbApi:ApiKey"]}");

        request.AddQueryParameter("include_adult", "false");
        request.AddQueryParameter("include_video", "false");
        request.AddQueryParameter("language", "en-US");
        request.AddQueryParameter("page", "1");
        request.AddQueryParameter("sort_by", "popularity.desc");

        var response = await _client.GetAsync(request);
        
        if (response.IsSuccessful && response.Content != null)
        {
            Console.WriteLine("TMDb Response:");
            Console.WriteLine(response.Content);
        }
        else
        {
            Console.WriteLine("Error fetching data:");
            Console.WriteLine(response.ErrorMessage ?? "Unknown error");
        }
    }
}
