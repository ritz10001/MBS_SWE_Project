using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Models.Movies;
using server.Models.Shows;
using server.Models.Theatres;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class TheatresController : ControllerBase {
    private readonly IMapper _mapper;
    private readonly ITheatresRepository _theatresRepository;

    public TheatresController(IMapper mapper, ITheatresRepository theatresRepository) {
        _mapper = mapper;
        _theatresRepository = theatresRepository;
    }   

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetTheatresDTO>>> GetTheatres() {
        var records = await _theatresRepository.GetAllAsync();
        var theatres = _mapper.Map<List<GetTheatresDTO>>(records);
        return Ok(theatres);
    }

    [HttpGet("{id}/movies")]
    public async Task<ActionResult<IEnumerable<GetMoviesDTO>>> GetMoviesByTheatre(int id) {
        var records = await _theatresRepository.GetTheatreWithMovies(id);
        var movies = _mapper.Map<List<GetMoviesDTO>>(records);
        return Ok(movies);
    }
    

}