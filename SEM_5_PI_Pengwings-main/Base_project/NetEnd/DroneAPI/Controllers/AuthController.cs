using DroneAPI.Domain.Login;
using Microsoft.AspNetCore.Mvc;


namespace DroneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try{
            var user = await _authService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);

            if (user == null)
                return Unauthorized();

            Console.WriteLine(user.getRole());
            Console.WriteLine(user.getEmail());
            var token = _authService.GenerateJwtToken(user.getRole(), user.getEmail());

            return Ok(new { Token = token });
            }
            catch(InvalidOperationException e){
                Console.WriteLine(e.Message);
                return BadRequest(e.Message);
            }
        }
    }
}