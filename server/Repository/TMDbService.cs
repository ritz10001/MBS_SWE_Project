// using System.Net.Http.Json;
// using Newtonsoft.Json;
// using RestSharp;
// using server.DTOs;
// using server.Interface;
// using server.Models;

// namespace server.Repository;

// public class TMDbService
// {
//     private readonly RestClient _client;
//     private readonly IConfiguration _configuration;
//     private readonly string _apiKey;
//     private readonly IMoviesRepository _moviesRepository;
//     private readonly MBSDbContext _context;
//     public TMDbService(IConfiguration configuration, IMoviesRepository moviesRepository, MBSDbContext context)
//     {
//         _context = context;
//         _configuration = configuration;
//         _moviesRepository = moviesRepository;
//         _apiKey = configuration["TMDbApi:ApiKey"];
//         var options = new RestClientOptions("https://api.themoviedb.org/3/")
//         {
//             ThrowOnAnyError = true
//         };
//         _client = new RestClient(options);
//     }

//     public async Task<List<Movie>> DiscoverMoviesAsync()
//     {
//         var movieDtos = new List<TMDbMovieDTO>();
//         var request = new RestRequest("discover/movie", Method.Get);
//         request.AddHeader("accept", "application/json");
//         request.AddHeader("Authorization", $"Bearer {_configuration["TMDbApi:ApiKey"]}");

//         request.AddQueryParameter("include_adult", "false");
//         request.AddQueryParameter("include_video", "false");
//         request.AddQueryParameter("language", "en-US");
//         request.AddQueryParameter("page", "1");
//         request.AddQueryParameter("sort_by", "popularity.desc");

//         var response = await _client.GetAsync(request);
        
//         if (response.IsSuccessful && response.Content != null)
//         {
//             Console.WriteLine("TMDb Response:");
//             // Console.WriteLine(response.Content);
//         }
//         else
//         {
//             Console.WriteLine("Error fetching data:");
//             Console.WriteLine(response.ErrorMessage ?? "Unknown error");
//             return new List<Movie>();
//         }

//         var json = JsonConvert.DeserializeObject<dynamic>(response.Content);
//         var results = json.results;

//         var movies = new List<Movie>();
//         foreach (var item in results)
//         {
//             int movieId = item.id;
//             var detailedMovie = await GetMovieDetailsAsync(movieId);
//             if (detailedMovie != null)
//             {
//                 movies.Add(detailedMovie);
//             }
//         }
//         foreach (var movie in movies)
//         {
//             var exists = await _moviesRepository.ExistsByTMDbIdAsync(movie.TMDbId);
//             if (!exists)
//             {
//                 await _moviesRepository.AddAsync(movie);
//                 await GenerateRandomShowtimesAsync(movie); // ← Auto-generate shows
//                 Console.WriteLine($"✔️ Imported: {movie.Title}");
//             }
//             else
//             {
//                 Console.WriteLine($"⏩ Skipped (already exists): {movie.Title}");
//             }
//         }


//         return movies;
//     }

//     private async Task<Movie?> GetMovieDetailsAsync(int movieId)
//     {
//         var detailsRequest = new RestRequest($"movie/{movieId}", Method.Get);
//         detailsRequest.AddHeader("accept", "application/json");
//         detailsRequest.AddHeader("Authorization", $"Bearer {_apiKey}");

//         var creditsRequest = new RestRequest($"movie/{movieId}/credits", Method.Get);
//         creditsRequest.AddHeader("accept", "application/json");
//         creditsRequest.AddHeader("Authorization", $"Bearer {_apiKey}");

//         var detailsResponse = await _client.ExecuteAsync(detailsRequest);
//         var creditsResponse = await _client.ExecuteAsync(creditsRequest);

//         if (!detailsResponse.IsSuccessful || !creditsResponse.IsSuccessful)
//             return null;

//         var movieDto = JsonConvert.DeserializeObject<TMDbMovieDTO>(detailsResponse.Content);
//         var creditsDto = JsonConvert.DeserializeObject<CreditsDTO>(creditsResponse.Content);

//         return MapToMovie(movieDto, creditsDto);  
//     }
//     private Movie MapToMovie(TMDbMovieDTO dto, CreditsDTO credits)
//     {
//         // Get top 3 cast members
//         var castNames = credits.Cast
//             .OrderBy(c => c.Order ?? int.MaxValue)
//             .Take(3)
//             .Select(c => c.Name)
//             .ToList();

//         // Get first director
//         var director = credits.Crew.FirstOrDefault(c => c.Job?.ToLower() == "director")?.Name ?? "Unknown";

//         return new Movie
//         {
//             TMDbId = dto.Id,
//             Title = dto.Title,
//             Description = dto.Overview,
//             Duration = dto.Runtime,
//             Director = director,
//             Cast = string.Join(", ", castNames),
//             Rating = dto.Vote_Average ?? 0,
//             Genre = string.Join(", ", dto.Genres.Select(g => g.Name)),
//             ReleaseDate = DateTime.TryParse(dto.ReleaseDate, out var releaseDate) ? releaseDate : DateTime.MinValue,
//             ImageUrl = $"https://image.tmdb.org/t/p/w500{dto.PosterPath}",
//             isActive = true
//         };
//     }

//     public async Task<bool> ExistsByTMDbIdAsync(int tmdbId)
//     {
//         return await _context.Movies.AnyAsync(m => m.TMDbId == tmdbId);
//     }

// }
