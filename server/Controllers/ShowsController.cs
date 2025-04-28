using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Models.Movies;
using server.Models.Shows;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class ShowsController : ControllerBase {
    private readonly IMapper _mapper;
    private readonly IShowsRepostory _showsRepostory;

    public ShowsController(IMapper mapper, IShowsRepostory showsRepostory) {
        _mapper = mapper;
        _showsRepostory = showsRepostory;
    }
   
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetShowsDTO>>> GetShows() {
        
        var shows = await _showsRepostory.GetAllShows();
        // var shows = _mapper.Map<List<GetShowsDTO>>(records);
        var showDTOs = shows.Select(show => new GetShowsDTO
        {
            Id = show.Id,
            ShowTime = show.ShowTime,
            TicketPrice = show.TicketPrice,
            isActive = show.isActive,
            TheatreId = show.TheatreId,
            MovieId = show.MovieId,
            TheatreName = show.Theatre?.Name,  // safe access
            Location = show.Theatre?.Location  // safe access
        }).ToList();
        return Ok(showDTOs);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetShowDTO>> GetShow(int id) {
        var record = await _showsRepostory.GetShowWithDetails(id);
        if (record == null) {
            return NotFound();
        }
        var show = _mapper.Map<GetShowDTO>(record);
        return Ok(show);
    }
    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<Show>> PostShow(CreateShowDTO createShowDTO) {
        var show = _mapper.Map<Show>(createShowDTO);
        await _showsRepostory.AddAsync(show);
        return CreatedAtAction("GetShow", new { id = show.Id }, show);
    }
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> SoftDeleteShow(int id) {
        var show = await _showsRepostory.GetAsync(id);
        if (show == null) {
            return NotFound();
        }
        show.isActive = false; // Set isActive to false instead of deleting
        await _showsRepostory.UpdateAsync(show);
        return NoContent();
    }   

    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateShow(int id, UpdateShowDTO updateShowDTO) {
        if (id != updateShowDTO.Id) {
            return BadRequest();
        }

        var movie = await _showsRepostory.GetAsync(id);

        if(movie == null) {
            return NotFound();
        }

        _mapper.Map(updateShowDTO, movie);
        
        try {
            await _showsRepostory.UpdateAsync(movie);
        } 
        catch (DbUpdateConcurrencyException) {
            if (!await ShowExists(id)) {
                return NotFound();
            } else {
                throw;
            }
        }
        return NoContent();
    }

    private async Task<bool> ShowExists(int id) {
        var show = await _showsRepostory.GetAsync(id);
        return show != null;
    }

}