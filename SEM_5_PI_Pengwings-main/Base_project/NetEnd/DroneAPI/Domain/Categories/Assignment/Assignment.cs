using System;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Assignments
{
    public class Assignment : Entity<AssignmentId>, IAggregateRoot
    {
        public string StartPoint{ get; private set; }
        public string EndPoint{ get; private set; }
        public AssignmentStatus Status { get; private set; }
        public AssignmentType Type { get; private set; }
        public string Email { get; private set; }
        public string Name { get; private set; }

        public Assignment(string startPoint, string endPoint, AssignmentType type,string email,string name)
        {
            ValidateAssignment(startPoint, endPoint);
            this.Id = new AssignmentId(Guid.NewGuid());
            this.StartPoint = startPoint;
            this.EndPoint = endPoint;
            this.Status = AssignmentStatus.Pending;
            this.Type = type;
            this.Email = email;
            this.Name = name;
        }

        private void ValidateAssignment(string startPoint, string endPoint)
        {
            if (string.IsNullOrEmpty(startPoint))
            {
                throw new ArgumentException("Start point cannot be empty");
            }
            if (string.IsNullOrEmpty(endPoint))
            {
                throw new ArgumentException("End point cannot be empty");
            }
        }
        public void Accept()
        {
            this.Status = AssignmentStatus.Accepted;
        }
        public void Reject()
        {
            this.Status = AssignmentStatus.Rejected;
        }
    }
}