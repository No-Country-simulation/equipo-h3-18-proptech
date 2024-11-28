using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue;
using h3_18_proptechback.Application.Features.DataUserValue.Command;
using h3_18_proptechback.Application.Features.DataUserValue.Queries;
using h3_18_proptechback.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataUserController : ControllerBase
    {
        private readonly DataUserCommandHandler _RepoData;
        private readonly DataUserQueriesHandler _RepoQueries;
        public DataUserController(DataUserCommandHandler repoData, DataUserQueriesHandler repoQueries)
        {
            _RepoData = repoData;
            _RepoQueries = repoQueries;
        }

        [HttpPost(Name = "CreateDataUsers")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<VMDataUser>> CreateDataUsers([FromBody] DataUser data )
        {
            var result =  await _RepoData.Add(data);

            return Ok(result);
        }

        [HttpPatch(Name = "UpdateDataUsers")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<VMDataUser>> UpdataeDataUsers([FromBody] DataUser data)
        {
            var result = await _RepoData.Update(data);

            return Ok(result);
        }

        [HttpDelete(Name = "DeleteDataUsers")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<bool>> DeleteDataUsers([FromBody] Guid id)
        {
            var result = await _RepoData.Delete(id);

            return Ok(result);
        }

        [HttpGet(Name = "DataUsers por Id")]
        //[Authorize(Roles = "Administrator")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<bool>> GetbyIdDataUsers([FromBody] Guid id)
        {
            var result = await _RepoQueries.GetIdAsync(id);

            return Ok(result);
        }
    }
}
