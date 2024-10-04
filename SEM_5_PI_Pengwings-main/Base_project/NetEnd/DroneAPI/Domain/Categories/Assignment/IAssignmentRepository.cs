using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Assignments
{

    public interface IAssignmentRepository: IRepository<Assignment, AssignmentId>
    {
        Task<IEnumerable<Assignment>> GetAllRejectedAsync();
        Task<IEnumerable<Assignment>> GetAllPendingAsync();
        Task<IEnumerable<Assignment>> GetAllAcceptedAsync();
  }
}