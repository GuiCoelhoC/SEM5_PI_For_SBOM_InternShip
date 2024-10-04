using DroneAPI.Domain.Assignments;
using DroneAPI.Infrastructure.Shared;

namespace DroneAPI.Infrastructure.Assignments
{
    using Microsoft.EntityFrameworkCore; // Add the missing using directive

    public class AssignmentRepository : BaseRepository<Assignment, AssignmentId>, IAssignmentRepository
    {
        private DbSet<Assignment> _dbSet;
    
        public AssignmentRepository(DroneAPIDbContext context):base(context.Assignments)
        {
           _dbSet = context.Set<Assignment>();
        }

        public async Task<IEnumerable<Assignment>> GetAllRejectedAsync()
        {
            var assignments = await _dbSet.Where(x => x.Status == AssignmentStatus.Rejected).ToListAsync();

            return assignments;
        }

        public async Task<IEnumerable<Assignment>> GetAllPendingAsync()
        {
            var assignments = await _dbSet.Where(x => x.Status == AssignmentStatus.Pending).ToListAsync();

            return assignments;
        }

        public async Task<IEnumerable<Assignment>> GetAllAcceptedAsync()
        {
            var assignments = await _dbSet.Where(x => x.Status == AssignmentStatus.Accepted).ToListAsync();

            return assignments;
        }
    }
}