﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Entities;
using WebApp.Models;
using WebApp.Repositories.implementations;
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
            user.PhotoUrl = model.PhotoUrl;

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
                PhotoUrl = model.PhotoUrl,
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

        [HttpPost("import")]
        public async Task<IActionResult> ImportUsers(List<UserModel> model)
        {
            if (model == null || model.Count == 0)
            {
                return BadRequest("No users data provided.");
            }

            List<Users> users = new List<Users>();

            try
            {
                foreach (var userModel in model)
                {
                    userModel.Password = Utilities.GeneratePassword();
                    var user = new Users
                    {
                        Name = userModel.Name,
                        Email = userModel.Email,
                        Password = userModel.Password,
                        MobileNumber = userModel.MobileNumber,
                        PhotoUrl = userModel.PhotoUrl,
                    };
                    users.Add(user);
                }

                await _userRepository.CreateListAsync(users);// Add to the database context

                return Ok(new { message = "Batch imported successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception (essential for debugging)
                System.Diagnostics.Debug.WriteLine(ex);  // Or use your logging framework
                return StatusCode(StatusCodes.Status500InternalServerError);// Return 500 Internal Server Error
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetByAsync(u => u.Email.Equals(model.Email));

            if (user == null)
            {
                return NotFound();
            }

            if (!user.Password.Equals(model.Password))
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
