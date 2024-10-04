using System;

namespace DroneAPI.Domain.Assignments
{

    public class AssignmentDto
    {
        public Guid Id { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
    }
}