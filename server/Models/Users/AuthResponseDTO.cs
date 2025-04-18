using System.ComponentModel.DataAnnotations;

namespace server.Models.Users;

public class AuthResponseDTO {
    public string UserId { get; set; }  
    public string Token { get; set; } 
}