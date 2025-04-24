

using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Interface;
using server.Models;
using server.Models.Payments;
using Server.Models.Payments;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class PaymentsController : ControllerBase {
    private readonly IMapper _mapper;
    private readonly IPaymentsRepository _paymentsRepository; // Assuming you have a payment repository
    private readonly IBookingsRepository _bookingRepository; // Assuming you have a booking repository
    private readonly ITicketsRepository _ticketsRepository; // Assuming you have a ticket repository

    public PaymentsController(IMapper mapper, IPaymentsRepository paymentService, IBookingsRepository bookingService, ITicketsRepository ticketService) // Inject the booking service
    {
        _mapper = mapper;
        _paymentsRepository = paymentService;
        _bookingRepository = bookingService; // Initialize the booking service
        _ticketsRepository = ticketService; // Initialize the ticket service
    }

    [HttpPost("create")]
    [Authorize(Roles = "User, Administrator")] // Only Users and Admins can access this endpoint
    public async Task<ActionResult<PaymentResponseDTO>> CreatePayment(CreatePaymentDTO createPaymentDTO)
    {
        if (createPaymentDTO == null)
        {
            return BadRequest("Invalid payment data.");
        }

        var userId = GetUserId();
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("Login is required to create a payment.");
        }

        // Step 1 : Calculate the total amount with tax
        const decimal baseTicketPrice = 20.0m; 
        const decimal taxRate = 1.05m; // 5% tax rate
        decimal totalAmount = baseTicketPrice * createPaymentDTO.NumberOfTickets * taxRate; // Calculate total amount with tax

        // Step 2 : Create a new Booking instance
        var booking = new Booking
        {
            ShowId = createPaymentDTO.ShowId, // Assuming BookingId is the ShowId in this context
            TotalAmount = totalAmount,
            BookingDate = DateTime.UtcNow,
            NumberOfTickets = createPaymentDTO.NumberOfTickets,
            PaymentStatus = "Completed", // Assuming the payment is successful for this example
            UserId = userId, // Set the user ID from the token
        };
        await _bookingRepository.AddAsync(booking); // Save the booking to the database

        var payment = new Payment
        {
            Amount = totalAmount,
            PaymentDate = DateTime.UtcNow,
            PaymentMethod = createPaymentDTO.PaymentMethod,
            TransactionId = GenerateTransactionId(),
            PaymentStatus = "Success", // Assuming the payment is successful for this example
            BookingId = booking.Id, // Set the foreign key relationship
        };
        await _paymentsRepository.AddAsync(payment); // Save the payment to the database

        booking.PaymentId = payment.Id; // Set the foreign key relationship
        await _bookingRepository.UpdateAsync(booking); // Update the booking with the payment ID

        for (int i = 0; i < booking.NumberOfTickets; i++)
        {
        // Step 3 : Create tickets for the booking
            var ticket = new Ticket
            {
                BookingId = booking.Id,
                TicketCode = GenerateTicketCode(),
                IssueDate = DateTime.UtcNow
            };
            await _ticketsRepository.AddAsync(ticket);
        }

        var paymentDTO = _mapper.Map<Payment>(createPaymentDTO);
        return CreatedAtAction(nameof(GetPayment), new { id = paymentDTO.Id }, new PaymentResponseDTO
        {
            Id = payment.Id,
            Amount = payment.Amount,
            PaymentDate = payment.PaymentDate,
            PaymentMethod = payment.PaymentMethod,
            TransactionId = payment.TransactionId,
            PaymentStatus = payment.PaymentStatus,
            BookingId = booking.Id // Include the booking ID in the response
        });
    }   

    [HttpGet("{id}")]
    [Authorize(Roles = "Administrator")] 
    public async Task<ActionResult<GetPaymentDTO>> GetPayment(int id)
    {
        var payment = await _paymentsRepository.GetAsync(id);
        if (payment == null)
        {
            return NotFound("Payment not found.");
        }
        var paymentDTO = _mapper.Map<GetPaymentDTO>(payment);
        return Ok(paymentDTO);
    }

    private string? GetUserId()
    {
        return User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;   
    }

    private string GenerateTransactionId()
    {
        return Guid.NewGuid().ToString(); // Simulating a unique transaction ID
    }

    private string GenerateTicketCode() {
        var random = new Random();
        return $"{DateTime.UtcNow:yyyyMMddHHmmss}{random.Next(1000, 9999)}"; // Example format: YYYYMMDDHHMMSS-XXXX
    }
}


