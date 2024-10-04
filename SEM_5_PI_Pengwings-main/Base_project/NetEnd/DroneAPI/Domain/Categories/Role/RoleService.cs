using System.Threading.Tasks;
using System.Collections.Generic;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Roles
{
    public class RoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRoleRepository _repo;

        public RoleService(IUnitOfWork unitOfWork, IRoleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }
    }
}