using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
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

        /// <summary>
        /// Inicia sesión en el sistema.
        /// </summary>
        /// <param name="request">La solicitud que contiene las credenciales de inicio de sesión.</param>
        /// <returns>
        /// Un token de autenticación y los datos asociados al usuario autenticado.
        /// </returns>
        /// <response code="200">El inicio de sesión fue exitoso. Devuelve el token de autenticación.</response>
        /// <response code="400">Error en las credenciales proporcionadas o fallo en la solicitud.</response>
        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthReponse>> Login([FromBody] AuthRequest request)
        {
            try
            {
                return Ok(await _authServices.Login(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Registra un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="request">La solicitud que contiene la información necesaria para el registro.</param>
        /// <returns>
        /// Los detalles del registro, incluyendo un posible token inicial o mensaje de confirmación.
        /// </returns>
        /// <response code="200">El registro fue exitoso. Devuelve los detalles del registro.</response>
        /// <response code="400">Error en los datos proporcionados o fallo en la solicitud.</response>
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<RegistrationResponse>> Register([FromBody] RegistrationRequest request)
        {
            try
            {
                return Ok(await _authServices.Register(request));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
