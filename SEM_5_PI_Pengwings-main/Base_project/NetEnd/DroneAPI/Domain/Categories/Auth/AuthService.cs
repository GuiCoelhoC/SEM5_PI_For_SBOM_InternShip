using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DroneAPI.Domain.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

public class AuthService
{
    private readonly IConfiguration _configuration;

    private readonly UserService _service;

    public AuthService(IConfiguration configuration, UserService service)
    {
        _configuration = configuration;
        _service = service;

    }

    public async Task<User> AuthenticateUserAsync(string email, string password)
    {
        try{
        //call service AuthenticateUser
        UserDto userDto = await _service.AuthenticateUser(email, password);

        //see if the user is not null
        if (userDto == null)
            return null;

        return new User(userDto.FirstName, userDto.LastName, userDto.Email, userDto.PhoneNumber, userDto.Role, userDto.Password, userDto.Status.ToString(), true);
        }
        catch(InvalidOperationException e){
            throw new InvalidOperationException(e.Message);
        }
    }
    public string GenerateJwtToken(string role, string email)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Issuer"],
            new[]
            {
                new Claim("Role", role),
                new Claim("Email", email),
            },
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}