using h3_18_proptechback.Application.Features.Loan.Queries.AdminLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.Common;
using h3_18_proptechback.Application.Features.Loan.Queries.GetMyLoans;
using h3_18_proptechback.Application.Features.Loan.Queries.MyAllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.PdfLoan;
using h3_18_proptechback.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly GetLoansQueryHandler _getLoansQueryHandler;
        private readonly GetMyLoansQueryHandler _getMyLoansQueryHandler;
        private readonly AdminLoanQueryHandler _adminLoanQueryHandler;
        private readonly ClientLoanQueryHandler _clientLoanQueryHandler;
        private readonly PdfLoanQueryHandler _pdfLoanQueryHandler;

        public LoanController(GetLoansQueryHandler getLoansQueryHandler, GetMyLoansQueryHandler getMyLoansQueryHandler,
            AdminLoanQueryHandler adminLoanQueryHandler, ClientLoanQueryHandler clientLoanQueryHandler, PdfLoanQueryHandler pdfLoanQueryHandler)
        {
            _getLoansQueryHandler = getLoansQueryHandler;
            _getMyLoansQueryHandler = getMyLoansQueryHandler;
            _adminLoanQueryHandler = adminLoanQueryHandler;
            _clientLoanQueryHandler = clientLoanQueryHandler;
            _pdfLoanQueryHandler = pdfLoanQueryHandler;
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
        [ProducesResponseType<List<GetLoansQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetLoansQueryResponse>> GetLoan(StateLoan? state = null, string? name = null)
        {
            try
            {
                return Ok(await _getLoansQueryHandler.HandleAsync(new GetLoansQuery(state, name)));
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
        [ProducesResponseType<List<GetMyLoansQueryResponse>>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<GetMyLoansQueryResponse>>> GetMyLoans()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _getMyLoansQueryHandler.GetMyAllLoan(email));
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
                return Ok(await _clientLoanQueryHandler.HandleAsync(new DetailsLoanQuery(page, stateQuota, loanId), email));
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
        [ProducesResponseType<AdminLoanQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AdminLoanQueryResponse>> GetLoan(Guid loanId, int page = 1, StateQuota? stateQuota = null)
        {
            try
            {
                return Ok(await _adminLoanQueryHandler.HandleAsync(new DetailsLoanQuery(page, stateQuota, loanId)));
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

        [HttpGet("loanPDF")]
        [Authorize(Roles = "Cliente")]
        public async Task<ActionResult<PdfLoanQueryResponse>> GetLoaPDF(Guid loanId)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                return Unauthorized("El token no contiene un email válido.");
            }
            try
            {
                return Ok(await _pdfLoanQueryHandler.HandleAsync(new PdfLoanQuery() { LoanId = loanId}, email));
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
