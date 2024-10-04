using System.Threading.Tasks;
using System.Collections.Generic;
using DroneAPI.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace DroneAPI.Domain.Users
{
    public class UserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;
        private readonly IConfiguration _configuration;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IConfiguration configuration)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._configuration = configuration;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDto = list.ConvertAll<UserDto>(cat => new UserDto { Id = cat.Id.AsGuid(), FirstName = cat.FirstName, LastName = cat.LastName, Email = cat.Email, PhoneNumber = cat.PhoneNumber, Password = cat.Password, Status = cat.Status, Role = cat.Role });

            return listDto;
        }

        public async Task<UserDto> GetByIdAsync(UserId id)
        {
            var cat = await this._repo.GetByIdAsync(id);

            if (cat == null)
                return null;

            return new UserDto { Id = cat.Id.AsGuid(), FirstName = cat.FirstName, LastName = cat.LastName, Email = cat.Email, PhoneNumber = cat.PhoneNumber, Password = cat.Password, Status = cat.Status, Role = cat.Role };
        }

        public async Task<UserDto> GetByEmailAsync(string email)
        {
            var cat = await this._repo.GetUserByEmailAsync(email);

            if (cat == null)
                return null;

            return new UserDto { Id = cat.Id.AsGuid(), FirstName = cat.FirstName, LastName = cat.LastName, Email = cat.Email, PhoneNumber = cat.PhoneNumber, Role = cat.Role, Password = cat.Password };
        }
        public async Task<UserDto> AddAsync(CreatingUserDto dto)
        {
            //dto.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            //Temporary "Accepted" status
            var User = new User(dto.FirstName, dto.LastName, dto.Email, dto.PhoneNumber, dto.Role, dto.Password, "Accepted");

            await this._repo.AddAsync(User);

            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = User.Id.AsGuid(), FirstName = User.FirstName, LastName = User.LastName, Email = User.Email, PhoneNumber = User.PhoneNumber, Role = User.Role, Password = User.Password };
        }

        public async Task<UserDto> UpdateAsync(UserDto dto)
        {
            var User = await this._repo.GetByIdAsync(new UserId(dto.Id));

            if (User == null)
                return null;

            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = User.Id.AsGuid(), FirstName = User.FirstName, LastName = User.LastName, Email = User.Email, PhoneNumber = User.PhoneNumber, Password = User.Password };
        }

        public async Task<UserDto> InactivateAsync(UserId id)
        {
            var User = await this._repo.GetByIdAsync(id);

            if (User == null)
                return null;

            // change all fields
            User.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = User.Id.AsGuid(), FirstName = User.FirstName, LastName = User.LastName, Email = User.Email, PhoneNumber = User.PhoneNumber, Password = User.Password };
        }

        public async Task<UserDto> InactiveAsyncByToken(string token)
        {
            var email = DecodeJwtTokenEmail(token);
            if (email == null)
            {
                return null;
            }

            var user = (await this._repo.GetAllAsync()).Find( us => us.Email == email);

            if (user == null){
                return null;
            }

            // change all fields
            user.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = user.Id.AsGuid(), FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, PhoneNumber = user.PhoneNumber, Password = user.Password };
        }

        public async Task<UserDto> DeleteAsync(UserId id)
        {
            var User = await this._repo.GetByIdAsync(id);

            if (User == null)
                return null;

            if (User.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active User.");

            this._repo.Remove(User);
            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = User.Id.AsGuid(), FirstName = User.FirstName, LastName = User.LastName, Email = User.Email, PhoneNumber = User.PhoneNumber, Password = User.Password };
        }

        public async Task<UserDto> AuthenticateUser(string email, string password)
        {
            var Users = await this._repo.GetAllAsync();

            //filter by email
            var User = Users.Find(x => x.Email == email);

            if (User == null)
                throw new InvalidOperationException("User not found.");

            if (User.Password != password)
                throw new InvalidOperationException("Wrong password.");

            if (User.Status.ToString() == "Pending")
                throw new InvalidOperationException("Your account is still pending.");

            if (User.Status.ToString() == "Rejected")
                throw new InvalidOperationException("Your account was rejected, try to register again.");

            return new UserDto { FirstName = User.FirstName, LastName = User.LastName, Email = User.Email, PhoneNumber = User.PhoneNumber, Role = User.Role, Password = User.Password, Status = User.Status };
        }

        public async Task<Boolean> CheckPasswordAsync(string token, string password)
        {
            var email = DecodeJwtTokenEmail(token);
            if (email == null)
            {
                return false;
            }

            var Users = await this._repo.GetAllAsync();

            //filter by email
            var User = Users.Find(x => x.Email == email);
            
            if (User == null)
                throw new InvalidOperationException("User not found.");

            if (User.Password != password)
                throw new InvalidOperationException("Wrong password.");

            return true;

        }

        internal string GetRole(string token)
        {
            var role = DecodeJwtTokenRole(token);
            Console.WriteLine(role);
            return role;
        }

        public string DecodeJwtTokenRole(string token)
        {
            var key = Encoding.UTF8.GetBytes(this._configuration["Jwt:Key"]);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            return claims.Claims.First(c => c.Type == "Role").Value;
        }

        public string DecodeJwtTokenEmail(string token)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            return claims.Claims.First(c => c.Type == "Email").Value;
        }
        public async Task<ActionResult<UserDto>> GetByTokenAsync(string token)
        {
            var email = DecodeJwtTokenEmail(token);
            if (email == null)
            {
                return null;
            }

            var user = (await this._repo.GetAllAsync()).Find( us => us.Email == email);

            if (user == null){
                return null;
            }

            return new UserDto { Id = user.Id.AsGuid(), FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, PhoneNumber = user.PhoneNumber, Password = user.Password, Role = user.Role, Status = user.Status };
        }

        public async Task<ActionResult<UserDto>> UpdateByTokenAsync(string token, UserDto dto)
        {
            var email = DecodeJwtTokenEmail(token);
            if (email == null)
            {
                return null;
            }

            var user = (await this._repo.GetAllAsync()).Find( us => us.Email == email);

            if (user == null){
                return null;
            }

            if (dto.FirstName != null)
            {
                user.changeFirstName(dto.FirstName);
            }

            if (dto.LastName != null)
            {
                user.changeLastName(dto.LastName);
            }

            if (dto.PhoneNumber != null)
            {
                user.changePhoneNumber(dto.PhoneNumber);
            }

            if (dto.Email != null)
            {
                user.changeEmail(dto.Email);
            }

            if (dto.Password != null)
            {
                user.changePassword(dto.Password);
            }

            if (dto.Role != null)
            {
                user.changeRole(dto.Role);
            }

            await this._unitOfWork.CommitAsync();

            return new UserDto { Id = user.Id.AsGuid(), FirstName = user.FirstName, LastName = user.LastName, Email = user.Email, PhoneNumber = user.PhoneNumber, Password = user.Password, Role = user.Role, Status = user.Status };
        }
    }
}