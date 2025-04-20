
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using server.Interface;
using server.Models;
using server.Models.Bookings;
using server.Models.Tickets;
using server.Models.Users;
using server.Repository;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class BookingController : ControllerBase {
    public readonly IMapper _mapper;
    public readonly IBookingsRepository _bookingRepository;  
    public readonly ITicketsRepository _ticketRepository;
    public BookingController(IMapper mapper, IBookingsRepository bookingRepository, ITicketsRepository ticketRepository) {
        _mapper = mapper;
        _bookingRepository = bookingRepository;
        _ticketRepository = ticketRepository;
    }

    [HttpGet("getAllBookings")]
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetBookings() {
        var records = await _bookingRepository.GetAllAsync();
        var bookings = _mapper.Map<List<GetBookingsDTO>>(records);
        return Ok(bookings);
    }

    [HttpGet("getMyBookings")]
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetMyBookings() {
        var userId = GetUserId();
        if(string.IsNullOrEmpty(userId)) {
            return BadRequest("You must be logged in to view Booking information.");
        }
        var records = await _bookingRepository.GetBookingsByUserId(userId);
        if (records == null) {
            return NotFound();
        }
        var bookings = _mapper.Map<List<GetBookingsDTO>>(records);
        return Ok(bookings);
    }

    [HttpGet("getBooking/{id}")]
    public async Task<ActionResult<GetBookingDTO>> GetBooking(int id) {
        var record = await _bookingRepository.GetBookingById(id);
        if (record == null) {
            return NotFound();
        }
        var tickets = await _ticketRepository.GetTicketsByBookingId(id);
        var booking = _mapper.Map<GetBookingDTO>(record);
        booking.Tickets = _mapper.Map<List<GetTicketsDTO>>(tickets);
        return Ok(booking);
    }  

    [HttpPost("createBooking")]
    public async Task<ActionResult<CreateBookingDTO>> CreateBooking(CreateBookingDTO createBookingDTO) {
        var userId = GetUserId();
        if(string.IsNullOrEmpty(userId)) {
            return BadRequest("You must be logged in to create a Booking.");
        }
        var booking = _mapper.Map<Booking>(createBookingDTO);
        booking.UserId = userId; 
        booking.PaymentStatus = "Pending"; // Assuming the payment is successful for this example
        await _bookingRepository.AddAsync(booking);

        return CreatedAtAction(nameof(GetBookings), new { id = booking.Id }, booking);
    }


    private string? GetUserId() {
        return User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
    }


}