using System.Threading.Tasks;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DroneAPIDbContext _context;

        public UnitOfWork(DroneAPIDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}