using h3_18_proptechback.Application.Features.DataUserValue.Command;
using h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser;
using h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser;
using h3_18_proptechback.Application.Features.DataUserValue.Queries;
using h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetDetailsRequestValidation;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataUserController : ControllerBase
    {
        private readonly DataUserCommandHandler _RepoData;
        private readonly DataUserQueriesHandler _RepoQueries;
        private readonly ValidateIdentityCommandHandler _validateIdentityCommandHandler;
        private readonly ValidateIdentityQueryHandler _validateIdentityQueryHandler;

        public DataUserController(DataUserCommandHandler repoData, DataUserQueriesHandler repoQueries,
            ValidateIdentityCommandHandler validateIdentityCommandHandler, ValidateIdentityQueryHandler validateIdentityQueryHandler)
        {
            _RepoData = repoData;
            _RepoQueries = repoQueries;
            _validateIdentityCommandHandler = validateIdentityCommandHandler;
            _validateIdentityQueryHandler = validateIdentityQueryHandler;
        }
        /// <summary>
        /// Crea un nuevo usuario en el sistema.
        /// </summary>
        /// <param name="request">La solicitud con los datos necesarios para crear el usuario.</param>
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
        public async Task<ActionResult<string>> CreateDataUsers([FromForm] AddUserCommand request)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                var result = await _RepoData.Add(request, email);
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
        [HttpPost("validateIdentity/{DNI}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> ValidateIdentity([FromRoute] string DNI)
        {
            try
            {
                string result = await _validateIdentityCommandHandler.ValidateUser(new ValidateUserCommand(DNI));
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
                return Ok(await _validateIdentityQueryHandler.GetPendingRequest());
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
        [HttpPost("rejectValidationIdentity/{DNI}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> RejectValidateIdentity([FromRoute] string DNI)
        {
            try
            {
                string result = await _validateIdentityCommandHandler.RejectUser(new ValidateUserCommand(DNI));
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

                var user = await _RepoQueries.CurrentUser(email);
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
                var result = await _RepoData.UpdateUser(command, email);
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
                return await _validateIdentityQueryHandler.GetDetailPendingRequest(DNI);
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

        [HttpGet(Name = "DataUsers por Id")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<bool>> GetbyIdDataUsers([FromBody] Guid id)
        {
            var result = await _RepoQueries.GetIdAsync(id);

            return Ok(result);
        }
    }
}
