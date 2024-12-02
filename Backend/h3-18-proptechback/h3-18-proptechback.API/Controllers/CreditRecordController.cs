
using h3_18_proptechback.CreditRecord.Models.Requets;
using h3_18_proptechback.CreditRecord.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace h3_18_proptechback.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CreditRecordController : ControllerBase
    {
        private readonly CreditRecordServices _creditRecord;

        public CreditRecordController(CreditRecordServices creditRecord)
        {
            _creditRecord = creditRecord;
        }

        /// <summary>
        /// Obtiene el puntaje de crédito (Credit Score) asociado al CUIT proporcionado.
        /// </summary>
        /// <param name="CUIT">Objeto de tipo <see cref="DeudasRequest"/> que contiene el CUIT del cliente.</param>
        /// <returns>
        /// Retorna un valor entero que representa el puntaje de crédito si la solicitud es exitosa (HTTP 200).
        /// En caso de error de CUIT, retorna un mensaje descriptivo del error (HTTP 400).
        /// En caso de error de la API, retorna un mensaje descriptivo del error (HTTP 500).
        /// </returns>
        /// <response code="200">Retorna el puntaje de crédito (entero).</response>
        /// <response code="400">Retorna un mensaje de error (string).</response>
        /// <response code="500">Retorna un mensaje de error (string).</response>
        [HttpGet("creditScore")]
        [ProducesResponseType<int>(200)]
        [ProducesResponseType<string>(400)]
        [ProducesResponseType<string>(500)]
        public async Task<ActionResult<int>> GetCreditScore([FromQuery] DeudasRequest CUIT)
        {
            try
            {
                var result = await _creditRecord.GetCreditScore(CUIT);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Error externo al servidor");
            }
        }

        //[HttpGet(Name = "DeudoresRecord")]
        ////[Authorize(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<int>> RecordCreditDeudor([FromQuery] DeudasRequest cuit)
        //{

        //    var result = await _creditRecord.ObtenerDeudasAsync(cuit);

        //    return Ok(result);
        //}

        //[HttpGet("HistorialCreditRecord")]
        ////[Authorize(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<int>> HistoryCreditRecord([FromQuery] DeudasRequest cuit)
        //{
        //    var result = await _creditRecord.ObtenerHistoriaAsync(cuit);

        //    return Ok(result);
        //}

        //[HttpGet(Name = "CheckRechazados")]
        ////[Authoze(Roles = "Administrator")]
        //[ProducesResponseType((int)HttpStatusCode.OK)]
        //public async Task<ActionResult<int>> ChequesRechazados([FromBody] DeudasRequest cuit)
        //{
        //    var result = await _creditRecord.ObtenerChequesRechazados(cuit);

        //    return Ok(result);
        //}

    }
}
