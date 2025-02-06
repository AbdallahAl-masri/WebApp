using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Repositories.Interfaces;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController(ILoginRepository _loginRepository) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Login(LoginModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _loginRepository.GetByAsync(u => u.UserName.Equals(model.UserName));

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
