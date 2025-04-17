
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class User : IdentityUser {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
}