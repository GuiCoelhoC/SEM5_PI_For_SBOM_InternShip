using DroneAPI.Domain.Roles;
using DroneAPI.Infrastructure.Shared;

namespace DroneAPI.Infrastructure.Roles
{
    public class RoleRepository : BaseRepository<Role, RoleId>, IRoleRepository
    {
    
        public RoleRepository(DroneAPIDbContext context):base(context.Roles)
        {
           
        }
    }
}