using h3_18_proptechback.Application.Features.WebHook.Commands.ApproveCuotaPayment;
using h3_18_proptechback.Application.Features.WebHook.Commands.PayQuota;
using h3_18_proptechback.MercadoPago.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebHookController : ControllerBase
    {
        private readonly PayQuotaCommandHandler _payQuotaCommandHandler;
        private readonly MercadoPagoConfiguration _configuration;
        public WebHookController(IOptions<MercadoPagoConfiguration> options, PayQuotaCommandHandler payQuotaCommandHandler)
        {
            _payQuotaCommandHandler = payQuotaCommandHandler;
            _configuration = options.Value;
        }
        [HttpPost("payQuota")]
        public async Task<ActionResult> PayQuota([FromBody] PayQuotaCommand command)
        {
            try
            {
                string xSignature = HttpContext.Request.Headers["x-signature"];
                if (string.IsNullOrEmpty(xSignature))
                {
                    return BadRequest("x-signature header missing");
                }

                var parts = xSignature.Split(',');

                string ts = null;
                string v1 = null;

                foreach (var part in parts)
                {
                    var keyValue = part.Split('=');
                    if (keyValue.Length == 2)
                    {
                        if (keyValue[0].Trim() == "ts")
                        {
                            ts = keyValue[1].Trim();
                        }
                        else if (keyValue[0].Trim() == "v1")
                        {
                            v1 = keyValue[1].Trim();
                        }
                    }
                }

                if (string.IsNullOrEmpty(ts) || string.IsNullOrEmpty(v1))
                {
                    return BadRequest("Invalid signature format");
                }

                string requestId = HttpContext.Request.Headers["x-request-id"];


                string template = $"id:{command.Data.Id};request-id:{requestId};ts:{ts};";

                string secretKey = _configuration.WebHookSecretKey;

                using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
                {
                    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(template));
                    string calculatedHash = BitConverter.ToString(hash).Replace("-", "").ToLower();

                    if (calculatedHash != v1)
                    {
                        return BadRequest("Invalid signature");
                    }
                }

                if (command.Type == "payment")
                {
                    await _payQuotaCommandHandler.HandleAsync(command);
                    return Ok();
                    
                }
                return BadRequest("Not payment type");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred: " + ex.Message);
            }
        }
    }
}
