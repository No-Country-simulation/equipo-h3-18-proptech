using h3_18_proptechback.Application.Features.LoanRequest.Command.AddLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Command.RejectLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Command.ValidateLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Queries.DetailsLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Queries.GetLoanRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanRequestController : ControllerBase
    {
        private readonly AddLoanRequestCommandHandler _addLoanRequestCommandHandler;
        private readonly ValidateLoanRequestCommandHandler _validateLoanRequestCommandHandler;
        private readonly RejectLoanRequestCommandHandler _rejectLoanRequestCommandHandler;
        private readonly DetailsLoanReqQueryHandler _detailsLoanReqQueryHandler;
        private readonly GetLoanRequestsQueryHandler _getLoanRequestsQueryHandler;
        public LoanRequestController(AddLoanRequestCommandHandler addLoanRequestCommandHandler,
            ValidateLoanRequestCommandHandler validateLoanRequestCommandHandler,
            RejectLoanRequestCommandHandler rejectLoanRequestCommandHandler, DetailsLoanReqQueryHandler detailsLoanReqQueryHandler,
            GetLoanRequestsQueryHandler getLoanRequestsQueryHandler)
        {
            _addLoanRequestCommandHandler = addLoanRequestCommandHandler;
            _validateLoanRequestCommandHandler = validateLoanRequestCommandHandler;
            _rejectLoanRequestCommandHandler = rejectLoanRequestCommandHandler;
            _detailsLoanReqQueryHandler = detailsLoanReqQueryHandler;
            _getLoanRequestsQueryHandler = getLoanRequestsQueryHandler;
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
        [Authorize(Roles = "Cliente")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> AddLoanRequest([FromForm] AddLoanRequestCommand command)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _addLoanRequestCommandHandler.HandleAsync(command, email));
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
        /// Valida una solicitud de préstamo específica.
        /// </summary>
        /// <param name="idLoanRequest">El identificador único de la solicitud de préstamo que se desea validar.</param>
        /// <returns>
        /// Un mensaje que indica si la validación fue exitosa o detalla los problemas encontrados.
        /// </returns>
        /// <response code="200">
        /// La solicitud de préstamo fue validada exitosamente.
        /// </response>
        /// <response code="400">
        /// Error de validación o un problema con los datos proporcionados. Devuelve los detalles del error.
        /// </response>
        /// <response code="401">
        /// El usuario no está autorizado para realizar esta operación.
        /// </response>
        /// <response code="500">
        /// Error interno del servidor. Devuelve el mensaje de la excepción.
        /// </response>
        [HttpPut("validateLoanRequest/{idLoanRequest}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> ValidateLoanRequest(Guid idLoanRequest)
        {
            try
            {
                return Ok(await _validateLoanRequestCommandHandler.HandleAsync(new ValidateLoanRequestCommand(idLoanRequest)));
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
        /// Rechaza una solicitud de préstamo específica.
        /// </summary>
        /// <param name="idLoanRequest">El identificador único de la solicitud de préstamo que se desea rechazar.</param>
        /// <returns>
        /// Un mensaje que indica si el rechazo fue exitoso o detalla los problemas encontrados.
        /// </returns>
        /// <response code="200">
        /// La solicitud de préstamo fue rechazada exitosamente.
        /// </response>
        /// <response code="400">
        /// Error de validación o un problema con los datos proporcionados. Devuelve los detalles del error.
        /// </response>
        /// <response code="401">
        /// El usuario no está autorizado para realizar esta operación.
        /// </response>
        /// <response code="500">
        /// Error interno del servidor. Devuelve el mensaje de la excepción.
        /// </response>
        [HttpPut("rejectLoanRequest/{idLoanRequest}")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> RejectLoanRequest(Guid idLoanRequest)
        {
            try
            {
                return Ok(await _rejectLoanRequestCommandHandler.HandleAsync(new RejectLoanRequestCommand(idLoanRequest)));
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
        /// Obtiene los detalles de una solicitud de préstamo específica.
        /// </summary>
        /// <param name="loanRequestId">
        /// Identificador único de la solicitud de préstamo cuya información se desea obtener.
        /// </param>
        /// <response code="200">
        /// Devuelve los detalles de la solicitud de préstamo especificada. Incluye información relevante sobre el cliente 
        /// y la solicitud de préstamo, así como el campo <c>creditScore</c> que indica la confiabilidad del cliente para 
        /// pagar sus deudas. Los valores posibles de <c>creditScore</c> son:
        /// - **1**: Muy confiable.
        /// - **2**: Confiable.
        /// - **3**: Neutral.
        /// - **4**: Poco confiable.
        /// - **5**: No confiable.
        /// </response>
        /// <response code="400">Error de validación en los parámetros proporcionados. Devuelve los detalles del error.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("detailsLoanRequest/{loanRequestId}")]
        [ProducesResponseType<DetailsLoanReqQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DetailsLoanReqQueryResponse>> GetDetailsLoanRequest(Guid loanRequestId)
        {
            try
            {
                return await _detailsLoanReqQueryHandler.HandleAsync(loanRequestId);
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
        [ProducesResponseType<List<GetLoanRequestsQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetLoanRequestsQueryResponse>>> GetPendingLoanRequest()
        {
            try
            {
                return Ok(await _getLoanRequestsQueryHandler.HandleAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
