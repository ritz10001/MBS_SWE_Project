
using Microsoft.AspNetCore.Mvc;
using server.Interface;
using server.Models.Users;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]

public class AccountController : ControllerBase {
    private readonly IAuthService _authService;
    public AccountController(IAuthService authService) {
        _authService = authService;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public async Task<ActionResult> Register([FromBody] UserDTO userDTO) {
        var errors = await _authService.Register(userDTO);

        if(errors.Any()) {
            foreach(var error in errors) {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return BadRequest(ModelState);
        }
        return Ok(new { message = "User registered successfully" });
    }

}
