using h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser;
using h3_18_proptechback.Application.Features.Loan.Command;
using h3_18_proptechback.Application.Features.Loan.Command.RequestLoan;
using h3_18_proptechback.Application.Features.Loan.Queries;
using h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly RequestLoanCommandHandler _handler;
        private readonly LoanRequestQueryHandler _loanQueryHandler;

        public LoanController(RequestLoanCommandHandler handler, LoanRequestQueryHandler loanQueryHandler)
        {
            _handler = handler;
            _loanQueryHandler = loanQueryHandler;
        }
        /// <summary>
        /// Envía una solicitud de préstamo para el usuario autenticado.
        /// </summary>
        /// <param name="request">La solicitud con los datos necesarios para procesar el préstamo.</param>
        /// <returns>
        /// Un mensaje que indica el éxito de la operación.
        /// </returns>
        /// <response code="200">
        /// La solicitud de préstamo fue enviada exitosamente. Devuelve un identificador de la operación.
        /// </response>
        /// <response code="400">
        /// Error de validación o un problema con los datos proporcionados. Devuelve los detalles del error.
        /// </response>
        /// <response code="401">
        /// El usuario no está autorizado.
        /// </response>
        /// <response code="500">
        /// Error interno del servidor. Devuelve el mensaje de la excepción.
        /// </response>
        [HttpPost("sendLoanRequest")]
        [Authorize(Roles = "Cliente, Inversor")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> CreateLoan([FromForm] RequestLoanCommand request)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _handler.SendLoanRequest(request, email));
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
            
        }

        /// <summary>
        /// Obtiene todas las solicitudes de préstamo pendientes.
        /// </summary>
        /// <returns>
        /// Una lista de solicitudes de préstamo pendientes.
        /// </returns>
        /// <response code="200">
        /// Operación exitosa. Devuelve una lista de solicitudes de préstamo pendientes.
        /// </response>
        /// <response code="401">
        /// El usuario no está autorizado para acceder a este recurso.
        /// </response>
        /// <response code="500">
        /// Error interno del servidor.
        /// </response>
        [HttpGet("allLoanRequestPending")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<List<AllReqLoanQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<AllReqLoanQueryResponse>>> GetPendingLoanRequest()
        {
            try
            {
                return Ok(await _loanQueryHandler.GetAllRequestLoan());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
