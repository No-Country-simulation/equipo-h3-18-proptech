using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using h3_18_proptechback.Application.Features.Investmant.Command.ExtractAmount;
using h3_18_proptechback.Application.Features.Investmant.Query.GetAllInvestment;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using Microsoft.AspNetCore.Authorization;
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
        private readonly GetAllInvestmentQueryHandler _getAllInvestmentQueryHandler;
        //private readonly UpdateShareInvesmantHandler _handlerUpdateShare;
        private readonly ExtractAmountCommandHandler _extractAmountCommandHandler;

        public InvestmantController(AddInvestmantCommandHandler handlerCommand, GetInvestmantUserQueryHandler handlerQuery,
            GetAllInvestmentQueryHandler getAllInvestmentQueryHandler, /*UpdateShareInvesmantHandler handlerUpdateShare,*/ ExtractAmountCommandHandler extractAmountCommandHandler)
        {
            _handlerCommand = handlerCommand;
            _handlerQuery = handlerQuery;
            _getAllInvestmentQueryHandler = getAllInvestmentQueryHandler;
            //_handlerUpdateShare = handlerUpdateShare;
            _extractAmountCommandHandler = extractAmountCommandHandler;
        }

        [HttpGet("dashboardInvestmant")]
        [Authorize(Roles = "Inversor")]
        [ProducesResponseType<GetInvestmantUserQueryResponse>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetInvestmantUserQueryResponse?>> GetInvestmant()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }               
                
                return Ok(await _handlerQuery.HandleAsync(email));
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
        [HttpPut("extractAmount")]
        [Authorize(Roles = "Inversor")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> ExtractAmount([FromBody] ExtractAmountCommand command)
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                if (string.IsNullOrEmpty(email))
                {
                    return Unauthorized("El token no contiene un email válido.");
                }
                await _extractAmountCommandHandler.HandleAsync(command, email);
                return Ok();
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

        [HttpPost("addInvestmant")]
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
                var result =  await _handlerCommand.HandleAsync(command, email);

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

        //[HttpPatch("ShareInvestmant")]
        //[Authorize(Roles = "Inversor")]
        //[ProducesResponseType<string>(StatusCodes.Status200OK)]
        //[ProducesResponseType<string>(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        //[ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        //public async Task<ActionResult<string>> AddshareInvestmant([FromQuery] UpdateShareInvesmantCommand command) 
        //{
        //    try
        //    {
        //        var email = User.FindFirstValue(ClaimTypes.Email);
        //        if (string.IsNullOrEmpty(email))
        //        {
        //            return Unauthorized("El token no contiene un email válido.");
        //        }
        //        var result = await _handlerUpdateShare.UpdateShareInvestAsync(command, email);

        //        return Ok(result);

        //    }
        //    catch (ArgumentException ArgEx)
        //    {
        //        return BadRequest(ArgEx.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}
        [HttpGet("allInvestment")]
        [Authorize(Roles = "Administrador")]
        [ProducesResponseType<string>(StatusCodes.Status200OK)]
        [ProducesResponseType<string>(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType<string>(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetAllInvestmentQueryResponse>> GetAllInvestment()
        {
            try
            {
                return Ok(await _getAllInvestmentQueryHandler.HandleAsync());
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
