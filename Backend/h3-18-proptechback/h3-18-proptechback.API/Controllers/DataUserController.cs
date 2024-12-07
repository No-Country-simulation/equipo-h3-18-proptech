using h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser;
using h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataUserController : ControllerBase
    {
        
        private readonly UpdateUserCommandHandler _updateUserCommandHandler;
        private readonly GetCurrentUserQueryHandler _getCurrentUserQueryHandler;

        public DataUserController(UpdateUserCommandHandler updateUserCommandHandler, GetCurrentUserQueryHandler getCurrentUserQueryHandler)
        {
            _updateUserCommandHandler = updateUserCommandHandler;
            _getCurrentUserQueryHandler = getCurrentUserQueryHandler;
        }
        /// <summary>
        /// Obtiene los datos del usuario actual a partir del token JWT.
        /// </summary>
        /// <returns>
        /// Devuelve los datos del usuario actual asociados con el token.
        /// </returns>
        /// <response code="200">
        /// Los datos del usuario fueron obtenidos exitosamente.
        /// El campo <c>stateValidation</c> en la respuesta indica el estado de la identidad del usuario, con los siguientes valores posibles:
        /// - **0**: Identidad no válida.
        /// - **1**: La solicitud está pendiente de revisión.
        /// - **2**: Identidad válida.
        /// </response>
        /// <response code="401">El token de autenticación no es válido o no está presente.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("currentUser")]
        [Authorize]
        [ProducesResponseType<GetCurrentUserQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetCurrentUserQueryResponse>> CurrentUser()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }

                var user = await _getCurrentUserQueryHandler.HandleAsync(email);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Actualiza el correo electrónico o el número de teléfono del usuario actual.
        /// </summary>
        /// <param name="command">El comando con los datos actualizados para el usuario.</param>
        /// <returns>
        /// Devuelve un resultado indicando el éxito o el fallo de la operación.
        /// </returns>
        /// <response code="200">La información del usuario fue actualizada exitosamente.</response>
        /// <response code="400">Error de validación o el usuario no fue encontrado.</response>
        /// <response code="401">El token de autenticación no es válido o no está presente.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpPut("updateEmailPhone")]
        [Authorize(Roles = "Cliente, Inversor")]
        [ProducesResponseType<UpdateUserCommandResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UpdateUserCommandResponse>> UpdateUser(UpdateUserCommand command)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                var result = await _updateUserCommandHandler.HandleAsync(command, email);
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
        
        //--------------------------------------------------------------------------------------------------------

        //[HttpPatch(Name = "UpdateDataUsers")]
        ////[Authorize(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<VMDataUser>> UpdataeDataUsers([FromBody] DataUser data)
        //{
        //    var result = await _RepoData.Update(data);

        //    return Ok(result);
        //}

        //[HttpDelete(Name = "DeleteDataUsers")]
        ////[Authorize(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<bool>> DeleteDataUsers([FromBody] Guid id)
        //{
        //    var result = await _RepoData.Delete(id);

        //    return Ok(result);
        //}

        //[HttpGet(Name = "DataUsers por Id")]
        ////[Authorize(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<bool>> GetbyIdDataUsers([FromBody] Guid id)
        //{
        //    var result = await _RepoQueries.GetIdAsync(id);

        //    return Ok(result);
        //}
    }
}
