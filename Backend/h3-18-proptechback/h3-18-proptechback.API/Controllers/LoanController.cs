using h3_18_proptechback.Application.Features.Loan.Command;
using h3_18_proptechback.Application.Features.Loan.Command.RequestLoan;
using h3_18_proptechback.Application.Features.Loan.Command.ValidateLoanRequest;
using h3_18_proptechback.Application.Features.Loan.Queries;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.DetailLoanReq;
using h3_18_proptechback.Application.Features.Loan.Queries.MyAllLoan;
using h3_18_proptechback.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
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
        [Authorize(Roles = "Cliente")]
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
                return Ok(await _handler.ValidateLoanRequest(new ValidateLoanRequestCommand(idLoanRequest)));
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
                return Ok(await _handler.RejectLoanRequest(new ValidateLoanRequestCommand(idLoanRequest)));
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
        /// Obtiene una lista de préstamos con filtros opcionales.
        /// </summary>
        /// <param name="state">
        /// Estado opcional del préstamo para filtrar resultados. Los valores posibles son:
        /// - **0**: Préstamo atrasado (Late).
        /// - **1**: Préstamo pendiente de aprobación (Pending).
        /// - **2**: Préstamo al día (AtDay).
        /// - **3**: Préstamo completado (Complete).
        /// - **Si no se proporciona, no se aplicará ningún filtro por estado.**
        /// </param>
        /// <param name="name">
        /// Nombre opcional del cliente para filtrar los resultados.
        /// Si no se proporciona, no se aplicará ningún filtro por nombre.
        /// </param>
        /// <returns>
        /// Devuelve una lista de préstamos filtrada según los criterios especificados.
        /// </returns>
        /// <response code="200">
        /// Operación exitosa. Devuelve la lista de préstamos filtrados.
        /// El campo <c>state</c> en cada elemento de la lista indica el estado del préstamo, con los siguientes valores:
        /// - **0**: Préstamo atrasado (Late).
        /// - **1**: Préstamo pendiente de aprobación (Pending).
        /// - **2**: Préstamo al día (AtDay).
        /// - **3**: Préstamo completado (Complete).
        /// </response>
        /// <response code="400">Error de validación en los parámetros proporcionados. Devuelve los detalles del error.</response>
        /// <response code="401">El usuario no está autorizado para realizar esta operación.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("allLoan")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<List<AllLoanQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AllLoanQueryResponse>> GetLoan(StateLoan? state = null, string? name = null)
        {
            try
            {
                return Ok(await _loanQueryHandler.GetAllLoan(new AllLoanQuery(state, name)));
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
        [ProducesResponseType<DetailLoanReqQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<DetailLoanReqQueryResponse>> GetDetailsLoanRequest(Guid loanRequestId)
        {
            try
            {
                return await _loanQueryHandler.GetDetailsLoanRequest(loanRequestId);
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
        /// Obtiene una lista de todos los préstamos asociados al cliente autenticado.
        /// </summary>
        /// <response code="200">
        /// Devuelve una lista de préstamos asociados al cliente autenticado. Cada elemento de la lista incluye el campo 
        /// <c>stateLoan</c>, que indica el estado del préstamo con los siguientes valores:
        /// - **0**: Préstamo con cuota/s atrasado/as (Late).
        /// - **1**: Préstamo con cuota/s pendiente/s (Pending).
        /// - **2**: Préstamo al día (AtDay).
        /// - **3**: Préstamo completado (Complete).
        /// </response>
        /// <response code="400">Error de validación en los parámetros proporcionados. Devuelve los detalles del error.</response>
        /// <response code="401">El usuario no está autorizado para realizar esta operación.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("allMyLoans")]
        [Authorize(Roles = "Cliente")]
        [ProducesResponseType<List<MyAllLoanQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<MyAllLoanQueryResponse>>> GetMyLoans()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _loanQueryHandler.GetMyAllLoan(email));
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
        /// Obtiene los detalles de un préstamo específico asociado al cliente autenticado.
        /// </summary>
        /// <param name="loanId">
        /// Identificador único del préstamo cuya información se desea obtener.
        /// </param>
        /// <param name="page">
        /// Número de página opcional para paginar los resultados. El valor predeterminado es **1**.
        /// </param>
        /// <param name="stateQuota">
        /// Estado opcional de las cuotas para filtrar resultados. Los valores posibles son:
        /// - **0**: Cuota atrasada (Late).
        /// - **1**: Cuota pendiente (Pending).
        /// - **2**: Cuotas pagada (AtDay).
        /// Si no se proporciona, no se aplicará ningún filtro por estado de las cuotas.
        /// </param>
        /// <returns>
        /// Devuelve los detalles del préstamo solicitado, incluyendo información sobre el cliente y sus cuotas.
        /// </returns>
        /// <response code="200">
        /// Operación exitosa. Devuelve los detalles del préstamo asociado al cliente autenticado.
        /// </response>
        /// <response code="400">Error de validación en los parámetros proporcionados. Devuelve los detalles del error.</response>
        /// <response code="401">El usuario no está autorizado para realizar esta operación.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("detailsLoan")]
        [Authorize(Roles = "Cliente")]
        [ProducesResponseType<ClientLoanQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<ClientLoanQueryResponse>> GetMyLoan(Guid loanId, int page = 1, StateQuota? stateQuota = null)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _loanQueryHandler.GetDetailsLoanClient(new ClientLoanQuery(page, stateQuota, loanId), email));
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
        /// Obtiene los detalles de un préstamo específico. Este endpoint es para uso administrativo.
        /// </summary>
        /// <param name="loanId">
        /// Identificador único del préstamo cuya información se desea obtener.
        /// </param>
        /// <param name="page">
        /// Número de página opcional para paginar los resultados. El valor predeterminado es **1**.
        /// </param>
        /// <param name="stateQuota">
        /// Estado opcional de las cuotas para filtrar resultados. Los valores posibles son:
        /// - **0**: Cuota atrasada (Late).
        /// - **1**: Cuota pendiente (Pending).
        /// - **2**: Cuotas pagada (AtDay).
        /// Si no se proporciona, no se aplicará ningún filtro por estado de las cuotas.
        /// </param>
        /// <returns>
        /// Devuelve los detalles del préstamo solicitado, incluyendo información sobre el cliente, el préstamo y sus cuotas.
        /// </returns>
        /// <response code="200">
        /// Operación exitosa. Devuelve los detalles del préstamo solicitado.
        /// </response>
        /// <response code="400">Error de validación en los parámetros proporcionados. Devuelve los detalles del error.</response>
        /// <response code="500">Error interno del servidor. Devuelve el mensaje de la excepción.</response>
        [HttpGet("detailsLoanAdmin")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<LoanQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<LoanQueryResponse>> GetLoan(Guid loanId, int page = 1, StateQuota? stateQuota = null)
        {
            try
            {
                return Ok(await _loanQueryHandler.GetDetailsLoan(new ClientLoanQuery(page, stateQuota, loanId)));
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
    }
}
