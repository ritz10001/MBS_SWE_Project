using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Models.Movies;
using server.Models.Shows;
using server.Repository;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase {
    private readonly IMapper _mapper;
    private readonly IMoviesRepository _moviesRepository;
    private readonly IShowsRepostory _showsRepostory;
    public MoviesController(IMapper mapper, IMoviesRepository moviesRepository, IShowsRepostory showsRepository) {
        _mapper = mapper;
        _moviesRepository = moviesRepository;
        _showsRepostory = showsRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetMoviesDTO>>> GetMovies() {
        var records = await _moviesRepository.GetAllAsync();
        var movies = _mapper.Map<List<GetMoviesDTO>>(records);
        return Ok(movies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetMovieDTO>> GetMovie(int id) {
        var record = await _moviesRepository.GetMovieWithReviews(id);
        if (record == null) {
            return NotFound();
        }
        var movie = _mapper.Map<GetMovieDTO>(record);
        var shows = await _showsRepostory.GetAllShowsForMovies(id);
        movie.Shows = shows.Select(s => new GetShowsDTO {
            Id = s.Id,
            ShowTime = s.ShowTime,
            TicketPrice = s.TicketPrice,
            isActive = s.isActive,
            TheatreId = s.TheatreId,
            MovieId = s.MovieId,
            TheatreName = s.Theatre.Name,
            Location = s.Theatre.Location
        }).ToList();
        
        return Ok(movie);
    }

    // [HttpPost("import-one-tmdb")]
    // [Authorize(Roles = "Administrator")]
    // public async Task<IActionResult> ImportOneFromTMDb()
    // {
    //     var movies = await _tmdbService.DiscoverMoviesAsync();
    //     if (movies.Count == 0) return BadRequest("No movie found or failed to fetch.");
        
    //     return Ok(movies[0]); // Return inserted movie just for confirmation
    // }


    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> PutMovie(int id, UpdateMovieDTO updateMovieDTO) {
 
        var movie = await _moviesRepository.GetAsync(id);

        if(movie == null) {
            return NotFound();
        }

        _mapper.Map(updateMovieDTO, movie);
        
        try {
            await _moviesRepository.UpdateAsync(movie);
        } 
        catch (DbUpdateConcurrencyException) {
            if (!await MovieExists(id)) {
                return NotFound();
            } else {
                throw;
            }
        }
        return NoContent();
    }
    
    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<Movie>> PostMovie(CreateMovieDTO createMovieDTO) {
        var movie = _mapper.Map<Movie>(createMovieDTO);
        await _moviesRepository.AddAsync(movie);
        return CreatedAtAction(nameof(GetMovie), new { id = movie.Id }, movie);
    }   

    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteMovie(int id) {
        var movie = await _moviesRepository.GetAsync(id);
        if (movie == null) {
            return NotFound();
        }
        await _moviesRepository.DeleteAsync(id); 
        return NoContent();
    }

    private async Task<bool> MovieExists(int id) {
        return await _moviesRepository.Exists(id);
    }

}


