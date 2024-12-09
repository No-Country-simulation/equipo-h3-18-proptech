using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmantController : ControllerBase
    {
        private readonly AddInvestmantCommandHandler _handlerCommand;
        private readonly GetInvestmantUserQueryHandler _handlerQuery;
        private readonly AddInvestmentFeeCommandHandler _feeCommmand;

        public InvestmantController(AddInvestmantCommandHandler handlerCommand, GetInvestmantUserQueryHandler handlerQuery,
                                    AddInvestmentFeeCommandHandler feeCommmand)
        {
            _handlerCommand = handlerCommand;
            _handlerQuery = handlerQuery;
            _feeCommmand = feeCommmand;
        }

        [HttpPost("RegisterInvestmant")]
        [Authorize(Roles = "Inversor")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> AddInvestmant([FromBody] AddInvestmantCommand command) 
        {
            try 
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                var result =  await _handlerCommand.AddInvestAsyc(command, email);

                return Ok(result);

            }
            catch (ArgumentException ArgEx) 
            {
                return BadRequest(ArgEx.Message);
            }
            catch (Exception ex) 
            { 
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("RegisterInvestmantFee")]
        [Authorize(Roles = "Inversor")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<string>> AddInvestmantFee([FromBody] AddInvestmentFeeCommand command)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                var result = await _feeCommmand.AddInvestmantFeeAsync(command, email);

                return Ok(result);

            }
            catch (ArgumentException ArgEx)
            {
                return BadRequest(ArgEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
