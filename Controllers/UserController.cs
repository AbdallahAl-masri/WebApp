using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Entities;
using WebApp.Models;
using WebApp.Repositories.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserRepository _userRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();

            if (users == null)
            {
                return BadRequest();
            }

            return Ok(users);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var user = await _userRepository.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest();
            }

            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = await _userRepository.FindByIdAsync(model.Id);

            if(user == null)
                return NotFound();

            user.Name = model.Name;
            user.Email = model.Email;
            user.Password = model.Password;
            user.MobileNumber = model.MobileNumber;

            await _userRepository.UpdateAsync(user);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddAsync(UserModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Users user = new Users
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                MobileNumber = model.MobileNumber,
            };

            await _userRepository.CreateAsync(user);
            return Created();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(UserModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userRepository.FindByIdAsync(model.Id);

            if (user == null)
                return NotFound();

            await _userRepository.DeleteAsync(user);
            return NoContent();
        }

    }
}
