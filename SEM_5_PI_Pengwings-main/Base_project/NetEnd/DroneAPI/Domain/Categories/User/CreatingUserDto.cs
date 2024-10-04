using System.ComponentModel.DataAnnotations;

namespace DroneAPI.Domain.Users
{
    public class CreatingUserDto
    {
        [Required]
        public string FirstName{ get; set; }
        [Required]
        public string LastName{ get; set; }
        [Required]
        [EmailAddress]
        public string Email{ get; set; }
        [Required]
        [Phone]
        public string PhoneNumber{ get; set; }
        [Required]
        public string Role{ get; set; }
        [Required]// 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$")]
        public string Password{ get; set; }
        

        public CreatingUserDto(string FirstName, string LastName, string Email, string PhoneNumber, string Role, string Password)
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.PhoneNumber = PhoneNumber;
            this.Role = Role;
            this.Password = Password;
        }
    }
}