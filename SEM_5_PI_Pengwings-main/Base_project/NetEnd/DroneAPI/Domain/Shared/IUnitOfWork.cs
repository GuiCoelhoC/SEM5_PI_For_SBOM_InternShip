using System.Threading.Tasks;

namespace DroneAPI.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}