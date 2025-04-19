
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Interface;
using server.Models.Bookings;
using server.Models.Users;
using server.Repository;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class BookingController : ControllerBase {
    public readonly IMapper _mapper;
    public readonly IBookingsRepository _bookingRepository;  
    public BookingController(IMapper mapper, IBookingsRepository bookingRepository) {
        _mapper = mapper;
        _bookingRepository = bookingRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetBookings() {
        var records = await _bookingRepository.GetAllAsync();
        var bookings = _mapper.Map<List<GetBookingsDTO>>(records);
        return Ok(bookings);
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetBookingsByUserId(string id) {
        var records = await _bookingRepository.GetBookingsByUserId(id);
        if (records == null) {
            return NotFound();
        }
        var bookings = _mapper.Map<List<GetBookingsDTO>>(records);
        return Ok(bookings);
    }
}