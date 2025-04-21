
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "Administrator")] // Only Admins can access this endpoint
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetBookings() {
        var records = await _bookingRepository.GetAllAsync();
        if (records == null) {
            return NotFound();
        }
        var bookings = _mapper.Map<List<GetBookingsDTO>>(records);
        return Ok(bookings);
    }

    [HttpGet("getMyBookings")]
    [Authorize(Roles = "User, Administrator")] // Only Users and Admins can access this endpoint
    public async Task<ActionResult<IEnumerable<GetBookingsDTO>>> GetMyBookings() {
        var userId = GetUserId();
        if(string.IsNullOrEmpty(userId)) {
            return BadRequest("You must be logged in to view Booking information.");
        }
        var records = await _bookingRepository.GetBookingsByUserId(userId);
        foreach (var record in records)
        {
            Console.WriteLine($"Booking ID: {record.Id}, ShowId: {record.ShowId}");
            Console.WriteLine($"Show is null? {record.Show == null}");
            Console.WriteLine($"Movie is null? {record.Show?.Movie == null}");
            Console.WriteLine($"Movie Title: {record.Show?.Movie?.Title}");
        }

        if (records == null) {
            return NotFound();
        }

        var bookings = records.Select(b => new GetBookingsDTO {
            Id = b.Id,
            BookingDate = b.BookingDate,
            NumberOfTickets = b.Tickets?.Count ?? 0,
            TotalAmount = b.TotalAmount,
            ShowTime = b.Show?.ShowTime ?? DateTime.MinValue,
            MovieTitle = b.Show?.Movie?.Title ?? "N/A",
            TheaterName = b.Show?.Theatre?.Name ?? "N/A",
            UserId = b.UserId
        }).ToList();
        return Ok(bookings);
    }

    [HttpGet("getBooking/{id}")]
    [Authorize(Roles = "User, Administrator")] // Only Users and Admins can access this endpoint
    public async Task<ActionResult<GetBookingDTO>> GetBooking(int id) {
        var record = await _bookingRepository.GetBookingById(id);
        if (record == null) {
            return NotFound();
        }
        var tickets = await _ticketRepository.GetTicketsByBookingId(id);
        var booking = _mapper.Map<GetBookingDTO>(record);
        booking.Tickets = _mapper.Map<List<GetTicketsDTO>>(tickets);
        booking.MovieTitle = record.Show.Movie.Title;
        booking.ShowTime = record.Show.ShowTime;
        booking.TheaterName = record.Show.Theatre.Name;
        return Ok(booking);
    }  

    private string? GetUserId() {
        return User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
    }


}