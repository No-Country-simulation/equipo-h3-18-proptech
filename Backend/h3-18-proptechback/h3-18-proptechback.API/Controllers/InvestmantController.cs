using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee;
using h3_18_proptechback.Application.Features.InvestmentFee.Query.GetInvestmentFeeByUserandMoth;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Domain.Common;
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
        private readonly GetInvestmentFeeByMothQueryHandler _HandlerQueryFee;

        public InvestmantController(AddInvestmantCommandHandler handlerCommand, GetInvestmantUserQueryHandler handlerQuery,
                                    AddInvestmentFeeCommandHandler feeCommmand)
        {
            _handlerCommand = handlerCommand;
            _handlerQuery = handlerQuery;
            _feeCommmand = feeCommmand;
        }


        [HttpGet("QueryInvestmant")]
        [Authorize(Roles = "Inversor")]
        [ProducesResponseType<List<GetInvestmantUserQueryHandler>>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetInvestmantUserQueryResponse>> GetInvestmant()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }

                var request = new GetInvestmantUserQueryRequest(email); 
               
                
                return Ok(await _handlerQuery.GetInvestmantByUserAsyc(request));
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

      
    }
}
