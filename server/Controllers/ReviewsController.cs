using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;
using server.Models.Movies;
using server.Models.Reviews;
using server.Models.Shows;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class ReviewsController : ControllerBase {
    private readonly IReviewsRepository _reviewsRepository; 
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    public ReviewsController(IReviewsRepository reviewsRepository, IMapper mapper, UserManager<User> userManager) {
        _reviewsRepository = reviewsRepository;
        _mapper = mapper;
        _userManager = userManager;
    }
    [HttpPost("add-review")]
    [Authorize(Roles = "User, Administrator")]
    public async Task<IActionResult> AddReview(CreateReviewDTO createReviewDTO) {
        var review = _mapper.Map<Review>(createReviewDTO);
        review.UserId = GetUserId(); // Get the current user's ID from the JWT token
        await _reviewsRepository.AddAsync(review);
        return Ok();
    }   

    [HttpPut("{id}")]
    [Authorize(Roles = "User, Administrator")]
    public async Task<IActionResult> UpdateReview(int id, UpdateReviewDTO updateReviewDTO) {

        var review = await _reviewsRepository.GetAsync(id);
        if (review == null) {
            return NotFound();
        }

        var currentUserId = GetUserId();
        var isAdmin = GetUserRoles().Contains("Administrator");

        if(review.UserId != currentUserId && !isAdmin) {
            return Forbid(); // User is not authorized to update this review, 403 error code
        }

        _mapper.Map(updateReviewDTO, review);
        review.ReviewDate = DateTime.UtcNow;
        
        try {
            await _reviewsRepository.UpdateAsync(review);
        } 
        catch (DbUpdateConcurrencyException) {
            if (!await ReviewExists(id)) {
                return NotFound();
            } else {
                throw;
            }
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "User, Administrator")]
    public async Task<IActionResult> DeleteReview(int id) {
        var review = await _reviewsRepository.GetAsync(id);
        if (review == null) {
            return NotFound();
        }

        var currentUserId = GetUserId();
        var isAdmin = GetUserRoles().Contains("Administrator");
        Console.WriteLine($"Is user an admin?: {isAdmin}");
        foreach(var role in GetUserRoles()) {
            Console.WriteLine(role);
        }

        if(review.UserId != currentUserId && !isAdmin) {
            return Forbid(); // User is not authorized to delete this review, 403 error code
        }

        await _reviewsRepository.DeleteAsync(id);
        return NoContent();
    }

    private async Task<bool> ReviewExists(int id) {
        var review = await _reviewsRepository.GetAsync(id);
        return review != null;
    }   

    private string? GetUserId() {
        return User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
    }

    private List<string> GetUserRoles() {
        var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
        return roles;
    }
}