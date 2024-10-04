using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DroneAPI.Domain.Shared;
using DroneAPI.Domain.Assignments;

namespace DroneAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly AssignmentService _service;

        public AssignmentController(AssignmentService service)
        {
            _service = service;
        }

        // POST: api/Assignment
        [HttpPost]
        public async Task<ActionResult<AssignmentDto>> Create(CreatingAssignmentDto dto)
        {
            var cat = await _service.AddAsync(dto);

            return cat;
        }
        // PUT: api/Assignment/5/5/5
        [HttpPut("{id}/{status}/{token}")]
        public async Task<ActionResult<AssignmentDto>> Update(string id, string status, string token)
        {
            try
            {
                var cat = await _service.UpdateStatusAsync(id, status, token);

                if (cat == null)
                {
                    return NotFound();
                }
                
                return cat;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // GET: api/Assignment/5
        [HttpGet("{token}")]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAll(string token)
        {
            try{
                var cats = await _service.GetAllAsync(token);

                return Ok(cats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // GET: api/Assignment/rejected/5
        [HttpGet("rejected/{token}")]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAllRejected(string token)
        {
            try{
                var cats = await _service.GetAllRejectedAsync(token);

                return Ok(cats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/Assignment/pendind/5

        [HttpGet("pendind/{token}")]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAllPending(string token)
        {
            try{
                var cats = await _service.GetAllPendingAsync(token);

                return Ok(cats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

                // GET: api/Assignment/accepted/5

        [HttpGet("accepted/{token}")]
        public async Task<ActionResult<IEnumerable<AssignmentDto>>> GetAllAccepted(string token)
        {
            try{
                var cats = await _service.GetAllAcceptedAsync(token);

                return Ok(cats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
