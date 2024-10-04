using System;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
     
        public string FirstName{ get; private set; }
        public string LastName{ get; private set; }
        public string Email{ get; private set; }
        public string PhoneNumber{ get; private set; }
        public string Password{ get; private set; }

        public string Role{ get; private set; }

        public UserStatus Status{ get; private set; }        
        public bool Active{ get;  private set; }

        private User()
        {
            this.Active = true;
        }

        public User(string FirstName, string LastName, string Email, string PhoneNumber, string Role, string Password, string Status)
        {
            this.Id = new UserId(Guid.NewGuid());
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.PhoneNumber = PhoneNumber;
            this.Password = Password;
            this.Role = Role;
            this.Status = (UserStatus)Enum.Parse(typeof(UserStatus), Status);
            this.Active = true;
        }

        public User(string FirstName, string LastName, string Email, string PhoneNumber, string Role, string Password, string Status, bool Active)
        {
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.PhoneNumber = PhoneNumber;
            this.Password = Password;
            this.Role = Role;
            this.Status = (UserStatus)Enum.Parse(typeof(UserStatus), Status);
            this.Active = Active;
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }

        public string getFirstName()
        {
            return this.FirstName;
        }
        public void changeFirstName(string newFirstName)
        {
            this.FirstName = newFirstName;
        }
        public string getLastName()
        {
            return this.LastName;
        }
        public void changeLastName(string newLastName)
        {
            this.LastName = newLastName;
        }
        public string getPhoneNumber()
        {
            return this.PhoneNumber;
        }
        public void changePhoneNumber(string newPhoneNumber)
        {
            this.PhoneNumber = newPhoneNumber;
        }
        public string getPassword()
        {
            return this.Password;
        }
        public void changePassword(string newPassword)
        {
            this.Password = newPassword;
        }
        public string getEmail()
        {
            return this.Email;
        }

        public void changeEmail(string newEmail)
        {
            this.Email = newEmail;
        }
        public string getRole()
        {
            return this.Role;
        }
        public void changeRole(string newRole)
        {
            this.Role = newRole;
        }

        public void PendingStatus()
        {
            this.Status = UserStatus.Pending;
        }

        public UserStatus getStatus()
        {
            return this.Status;
        }
        public void AcceptStatus()
        {
            this.Status = UserStatus.Accepted;
        }

        public void RejectStatus()
        {
            this.Status = UserStatus.Rejected;
        }

        
  }
}