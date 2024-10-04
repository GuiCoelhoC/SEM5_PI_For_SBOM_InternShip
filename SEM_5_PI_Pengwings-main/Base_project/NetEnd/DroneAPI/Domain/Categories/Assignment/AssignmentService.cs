using System.Threading.Tasks;
using System.Collections.Generic;
using DroneAPI.Domain.Shared;
using DroneAPI.Domain.Users;
using System.Runtime.CompilerServices;
using Microsoft.IdentityModel.Tokens;

namespace DroneAPI.Domain.Assignments
{
    public class AssignmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAssignmentRepository _repo;
        private readonly UserService _userService;
        public AssignmentService(IUnitOfWork unitOfWork, IAssignmentRepository repo, UserService userService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._userService = userService;
        }

        public async Task<AssignmentDto> AddAsync(CreatingAssignmentDto dto)
        {
            AssignmentType type = (AssignmentType)Enum.Parse(typeof(AssignmentType), dto.Type);

            var email = _userService.DecodeJwtTokenEmail(dto.Token);

            var assignments = await _repo.GetAllAsync();

            var number = assignments.Count + 1;
            
            var assignment = new Assignment(dto.StartPoint, dto.EndPoint, type, email, "t"+number);

            await _repo.AddAsync(assignment);
            
            await _unitOfWork.CommitAsync();

            return new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name  };
        }

        public async Task<AssignmentDto> UpdateStatusAsync(string id, string status, string token)
        {
            this.VerifyRole(token);

            var assignment = await _repo.GetByIdAsync(new AssignmentId(id));

            if (assignment == null)
            {
                throw new KeyNotFoundException($"Assignment with id {id} not found");
            }

            if (status == "a")
            {
                assignment.Accept();
            }
            else if (status == "r")
            {
                assignment.Reject();
            }

            await _unitOfWork.CommitAsync();

            return new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name };
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllAsync(string token)
        {
            this.VerifyRole(token);

            var assignments = await _repo.GetAllAsync();

            var assignmentDtos = new List<AssignmentDto>();

            foreach (var assignment in assignments)
            {
                assignmentDtos.Add(new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name });
            }

            return assignmentDtos;
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllRejectedAsync(string token)
        {
            this.VerifyRole(token);

            var assignments = await _repo.GetAllRejectedAsync();

            var assignmentDtos = new List<AssignmentDto>();

            foreach (var assignment in assignments)
            {
                assignmentDtos.Add(new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name });
            }

            return assignmentDtos;
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllPendingAsync(string token)
        {
            this.VerifyRole(token);

            var assignments = await _repo.GetAllPendingAsync();

            var assignmentDtos = new List<AssignmentDto>();

            foreach (var assignment in assignments)
            {
                assignmentDtos.Add(new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name });
            }

            return assignmentDtos;
        }

        public async Task<IEnumerable<AssignmentDto>> GetAllAcceptedAsync(string token)
        {
            this.VerifyRole(token);

            var assignments = await _repo.GetAllAcceptedAsync();

            var assignmentDtos = new List<AssignmentDto>();

            foreach (var assignment in assignments)
            {
                assignmentDtos.Add(new AssignmentDto {Id = assignment.Id.AsGuid(), StartPoint = assignment.StartPoint, EndPoint = assignment.EndPoint,Status = assignment.Status.ToString(), Type = assignment.Type.ToString(), Email = assignment.Email, Name = assignment.Name });
            }

            return assignmentDtos;
        }

        private void VerifyRole(string token)
        {
            var role = _userService.DecodeJwtTokenRole(token);

            if (role != "Task Manager")
            {
                throw new UnauthorizedAccessException("Only Task Managers can update assignments");
            }
        }
    }
}