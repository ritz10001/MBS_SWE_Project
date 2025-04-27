using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models.Users;

namespace server.Controllers;
[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase {
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserController(UserManager<User> userManager, SignInManager<User> signInManager) {
        _userManager = userManager;
        _signInManager = signInManager;
    }
    
    [HttpPut("update-profile")]
    [Authorize(Roles = "User, Administrator")]
    public async Task<IActionResult> UpdateProfile(UpdateUserDTO updateUserDTO) {
        var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
        if (userId == null) {
            return Unauthorized("Invalid token or user not logged in.");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) {
            return NotFound("User not found.");
        }

        var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, updateUserDTO.CurrentPassword, false);
        if(!passwordCheck.Succeeded) {
            return BadRequest("Current password is incorrect.");
        }

        user.FirstName = updateUserDTO.FirstName ?? user.FirstName;
        user.LastName = updateUserDTO.LastName ?? user.LastName;
        user.PhoneNumber = updateUserDTO.PhoneNumber ?? user.PhoneNumber;
        user.Address = updateUserDTO.Address ?? user.Address;

        if(!string.IsNullOrWhiteSpace(updateUserDTO.NewPassword) && !string.IsNullOrEmpty(updateUserDTO.CurrentPassword)) {
            if(updateUserDTO.NewPassword.Length < 6) {
                return BadRequest("New password must be at least 6 characters long.");
            }
            if(updateUserDTO.NewPassword == updateUserDTO.CurrentPassword) {
                return BadRequest("New password cannot be the same as the current password.");
            }
            var passwordResult = await _userManager.ChangePasswordAsync(user, updateUserDTO.CurrentPassword, updateUserDTO.NewPassword);
            if(!passwordResult.Succeeded) {
                return BadRequest(passwordResult.Errors);
            }
        }

        var updateResult = await _userManager.UpdateAsync(user);
        
        if (!updateResult.Succeeded) return BadRequest("Failed to update user profile.");

        return Ok("Profile updated successfully.");
    }

    [HttpGet("user-details")]
    [Authorize(Roles = "User, Administrator")]
    public async Task<ActionResult<GetUserDetailsDTO>> GetUserDetails() {
        var userId = User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
        if (userId == null) {
            return Unauthorized("Invalid token or user not logged in.");
        }
        Console.WriteLine(userId);
        var user = await _userManager.FindByIdAsync(userId);
        if(user == null) {
            return NotFound("User not found.");
        }

        var userDetails = new GetUserDetailsDTO {
            FirstName = user.FirstName,
            LastName = user.LastName,
            PhoneNumber = user.PhoneNumber,
            Address = user.Address,
            Email = user.Email
        };

        return Ok(userDetails);
    }
}   