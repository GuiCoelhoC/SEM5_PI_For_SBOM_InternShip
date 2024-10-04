using System;

namespace DroneAPI.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string FirstName{ get; set; }
        public string LastName{ get; set; }
        public string Email{ get; set; }
        public string PhoneNumber{ get; set; }
        public string Role{ get; set; }
        public string Password{ get; set; }
        
        public UserStatus Status{ get; set; }

        public bool Active{ get; set; }
    }
}