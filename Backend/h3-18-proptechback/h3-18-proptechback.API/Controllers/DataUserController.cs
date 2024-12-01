using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue;
using h3_18_proptechback.Application.Features.DataUserValue.Command;
using h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser;
using h3_18_proptechback.Application.Features.DataUserValue.Queries;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;
using h3_18_proptechback.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataUserController : ControllerBase
    {
        private readonly DataUserCommandHandler _RepoData;
        private readonly DataUserQueriesHandler _RepoQueries;
        private readonly ValidateIdentityCommandHandler _validateIdentityCommandHandler;

        public DataUserController(DataUserCommandHandler repoData, DataUserQueriesHandler repoQueries, ValidateIdentityCommandHandler validateIdentityCommandHandler)
        {
            _RepoData = repoData;
            _RepoQueries = repoQueries;
            _validateIdentityCommandHandler = validateIdentityCommandHandler;
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
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> CreateDataUsers([FromForm]AddUserCommand request)
        {
            try
            {
                var result = await _RepoData.Add(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Valida la identidad de un usuario en el sistema.
        /// </summary>
        /// <param name="request">La solicitud con los datos necesarios para crear el usuario.</param>
        /// <returns>
        /// Un resultado que indica el éxito o el fallo de la operación.
        /// </returns>
        [HttpPost("validateIdentity/{DNI}")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> ValidateIdentity([FromRoute] string DNI)
        {
            try
            {
                string result = await _validateIdentityCommandHandler.ValidateUser(new ValidateUserCommand(DNI));
                return Ok(result);
            }
            catch(ArgumentException argEx)
            {
                return BadRequest(argEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch(Name = "UpdateDataUsers")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<VMDataUser>> UpdataeDataUsers([FromBody] DataUser data)
        {
            var result = await _RepoData.Update(data);

            return Ok(result);
        }

        [HttpDelete(Name = "DeleteDataUsers")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<bool>> DeleteDataUsers([FromBody] Guid id)
        {
            var result = await _RepoData.Delete(id);

            return Ok(result);
        }

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
