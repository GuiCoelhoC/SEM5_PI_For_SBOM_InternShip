using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DroneAPI.Domain.Shared;
using DroneAPI.Domain.Users;
using DroneAPI.Domain.Login;
using System.Security.Claims;

namespace DroneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _service;

        public UsersController(UserService service)
        {
            _service = service;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new UserId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }
        
        [HttpPost]
        public async Task<ActionResult<UserDto>> Create(CreatingUserDto dto)
        {
            var exists = await _service.GetByEmailAsync(dto.Email);
            if (exists != null)
            {
                return BadRequest(new {Message = "Email already exists"});
            }
            
            var cat = await _service.AddAsync(dto);

            var returna = CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat); 
            return returna;
        }
        //Find a user via a JWT Token
        [HttpGet("token/{token}")]
        public async Task<ActionResult<UserDto>> GetByToken(string token)
        {
            var cat = await _service.GetByTokenAsync(token);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // Update information about a user via a JWT Token
        [HttpPatch("token/{token}")]
        public async Task<ActionResult<UserDto>> UpdateByToken(string token, UserDto dto)
        {
            var cat = await _service.UpdateByTokenAsync(token, dto);

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }


        // Get a user's role via a JWT Token
        [HttpGet("role")]
        public async Task<ActionResult<string>> GetRole(string token)
        {
            var role = _service.GetRole(token);

            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }
        
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Update(Guid id, UserDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateAsync(dto);
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [HttpDelete("token/{token}")]
        public async Task<ActionResult<UserDto>> DeleteByToken(string token, [FromQuery] string password)
        {
            var checkPassword = await _service.CheckPasswordAsync(token, password);

            if (checkPassword == false)
            {
                return BadRequest(new {Message = "Password is incorrect"});
            }

            var cat = await _service.InactiveAsyncByToken(token);

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }

        // Inactivate: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new UserId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }
        
        // DELETE: api/Users/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<UserDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new UserId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}