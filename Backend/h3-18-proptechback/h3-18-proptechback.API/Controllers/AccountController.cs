using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AccountController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthReponse>> Login([FromBody]AuthRequest request) 
        {
            return Ok(await _authServices.Login(request));
        }

        [HttpPost("Register")]
        public async Task<ActionResult<RegistrationResponse>> Register([FromBody] RegistrationRequest request, string rol)
        {
            return Ok(await _authServices.Register(request, rol));
        }
    }
}
