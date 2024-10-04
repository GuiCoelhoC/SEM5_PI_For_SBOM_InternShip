
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Users
{
    public interface IUserRepository: IRepository<User, UserId>
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}