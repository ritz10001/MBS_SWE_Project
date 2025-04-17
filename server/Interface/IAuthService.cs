using Microsoft.AspNetCore.Identity;
using server.Models.Users;

namespace server.Interface
{
    public interface IAuthService
    {
        Task<IEnumerable<IdentityError>> Register(UserDTO userDto);
        Task<bool> Login(LoginDTO loginDto);
    }
}