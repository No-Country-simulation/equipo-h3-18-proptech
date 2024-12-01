using h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SimulatorController : ControllerBase
    {
        private readonly CreditSimulatorCommandHandler _handler;

        public SimulatorController(CreditSimulatorCommandHandler handler)
        {
            _handler = handler;
        }

        /// <summary>
        /// Calcula el financiamiento de préstamo para el comprador.
        /// </summary>
        /// <param name="command">Datos de entrada para el cálculo del simulador.</param>
        /// <returns>Una respuesta que contiene los resultados del simulador o errores de validación.</returns>
        [HttpPost("buyerSimulator")]
        [ProducesResponseType(typeof(CreditSimulatorCommandResponse), StatusCodes.Status200OK)] // Respuesta exitosa
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)] // Error de validación
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)] // Error interno del servidor
        public ActionResult<CreditSimulatorCommandResponse> CalculateBuyer([FromBody] CreditSimulatorCommand command)
        {
            try
            {
                return Ok(_handler.Calculate(command));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
