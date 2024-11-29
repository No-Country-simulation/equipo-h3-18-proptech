using h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord;
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

        [HttpGet(Name = "DeudoresRecord")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<int>> RecordCreditDeudor([FromBody] DeudasRequest cuit)
        {
            var result = await _creditRecord.ObtenerDeudas(cuit);

            return Ok(result);
        }

        [HttpGet(Name = "HistorialRecod")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<int>> HistoryRecord([FromBody] DeudasRequest cuit)
        {
            var result = await _creditRecord.ObtenerHistoria(cuit);

            return Ok(result);
        }

        [HttpGet(Name = "CheckRechazados")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<int>> ChequesRechazados([FromBody] DeudasRequest cuit)
        {
            var result = await _creditRecord.ObtenerChequesRechazados(cuit);

            return Ok(result);
        }

    }
}
