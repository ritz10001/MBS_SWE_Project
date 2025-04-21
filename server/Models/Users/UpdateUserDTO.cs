

using server.Data;

namespace server.Models.Users
{
    public class UpdateUserDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; } 
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? CurrentPassword { get; set; }    
        public string? NewPassword { get; set; }
    }
}