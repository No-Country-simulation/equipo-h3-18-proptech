using h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.RejectUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.DetailReqIdentity;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetDetailsRequestValidation;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly AddUserCommandHandler _addUserCommandHandler;
        private readonly ValidateUserCommandHandler _validateUserCommandHandler;
        private readonly RejectUserCommandHandler _rejectUserCommandHandler;
        private readonly DetailReqIdentityQueryHandler _detailReqIdentityQueryHandler;
        private readonly GetRequestValidationQueryHandler _getRequestValidationQueryHandler;
        public IdentityController(ValidateUserCommandHandler validateUserCommandHandler,
            RejectUserCommandHandler rejectUserCommandHandler, DetailReqIdentityQueryHandler detailReqIdentityQueryHandler,
            GetRequestValidationQueryHandler getRequestValidationQueryHandler, AddUserCommandHandler addUserCommandHandler)
        {
            _validateUserCommandHandler = validateUserCommandHandler;
            _rejectUserCommandHandler = rejectUserCommandHandler;
            _detailReqIdentityQueryHandler = detailReqIdentityQueryHandler;
            _getRequestValidationQueryHandler = getRequestValidationQueryHandler;
            _addUserCommandHandler = addUserCommandHandler;
        }
        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="command">La solicitud con los datos necesarios para crear el usuario.</param>
        /// <returns>
        /// Un resultado que indica el éxito o el fallo de la operación.
        /// </returns>
        /// <response code="200">El usuario fue creado exitosamente. Devuelve el resultado de la operación.</response>
        /// <response code="400">Error de validación de FluentValidation. Devuelve los detalles del error.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpPost("sendValidationRequest", Name = "CreateDataUsers")]
        [Authorize(Roles = "Cliente, Inversor")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> AddUser([FromForm] AddUserCommand command)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                var result = await _addUserCommandHandler.HandleAsync(command, email);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        /// <summary>
        /// Valida la identidad de un usuario en el sistema.
        /// </summary>
        /// <param name="DNI">La solicitud con el DNI del usuario a validar.</param>
        /// <returns>
        /// Un resultado que indica el éxito o el fallo de la operación.
        /// </returns>
        /// <response code="200">La validación se realizó exitosamente.</response>
        /// <response code="400">El DNI no es válido o no se pudo realizar la validación.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpPut("validateIdentity/{DNI}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> ValidateUser([FromRoute] string DNI)
        {
            try
            {
                string result = await _validateUserCommandHandler.HandleAsync(new ValidateUserCommand(DNI));
                return Ok(result);
            }
            catch (ArgumentException argEx)
            {
                return BadRequest(argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Rechaza la validación de identidad de un usuario en el sistema.
        /// </summary>
        /// <param name="DNI">La solicitud con el DNI del usuario a validar.</param>
        /// <returns>
        /// Un resultado que indica el éxito o el fallo de la operación.
        /// </returns>
        /// <response code="200">La validación fue rechazada exitosamente.</response>
        /// <response code="400">El DNI no es válido o no se pudo realizar la operación.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpPut("rejectValidationIdentity/{DNI}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> RejectUser([FromRoute] string DNI)
        {
            try
            {
                string result = await _rejectUserCommandHandler.HandleAsync(new ValidateUserCommand(DNI));
                return Ok(result);
            }
            catch (ArgumentException argEx)
            {
                return BadRequest(argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Obtiene todas las solicitudes de validación de identidad que están pendientes.
        /// </summary>
        /// <returns>
        /// Una lista de respuestas que contienen las solicitudes de validación de identidad pendientes.
        /// </returns>
        /// <response code="200">
        /// La operación fue exitosa y devuelve la lista de solicitudes de validación pendientes.
        /// </response>
        [HttpGet("requestValidationPending")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<List<GetRequestValidationQueryResponse>>(StatusCodes.Status200OK)]
        public async Task<ActionResult<string>> GetRequestValidation()
        {
            return Ok(await _getRequestValidationQueryHandler.HandleAsync());
        }

        /// <summary>
        /// Obtiene los detalles de una solicitud de validación pendiente para el usuario identificado por su DNI.
        /// </summary>
        /// <param name="DNI">El número de documento nacional de identidad (DNI) del usuario.</param>
        /// <returns>
        /// Devuelve los detalles de la solicitud de validación pendiente asociados al DNI proporcionado.
        /// </returns>
        /// <response code="200">Los detalles de la solicitud de validación pendiente fueron obtenidos exitosamente.</response>
        /// <response code="400">Error de validación: el DNI es inválido o no se encontraron datos asociados.</response>
        /// <response code="401">El token de autenticación no es válido o no está presente.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("detailsRequestValidation/{DNI}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<DetailReqIdentityQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DetailReqIdentityQueryResponse>> GetDetailsRequestValidation(string DNI)
        {
            try
            {
                return await _detailReqIdentityQueryHandler.HandleAsync(DNI);
            }
            catch (ArgumentException argEx)
            {
                return BadRequest(argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
