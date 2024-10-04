using DroneAPI.Domain.Users;
using DroneAPI.Infrastructure.Shared;

namespace DroneAPI.Infrastructure.Users
{
    using Microsoft.EntityFrameworkCore; // Add the missing using directive

    public class UserRepository : BaseRepository<User, UserId>, IUserRepository
    {
        private DbSet<User> _dbSet; // Add the _dbSet field

        public UserRepository(DroneAPIDbContext context) : base(context.Users)
        {
            _dbSet = context.Set<User>(); // Initialize the _dbSet field
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _dbSet.FirstOrDefaultAsync(x => x.Email == email); // Use the _dbSet field

            return user;
        }
    }
}