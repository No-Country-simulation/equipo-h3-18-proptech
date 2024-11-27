using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace h3_18_proptechback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataUserController : ControllerBase
    {
        private readonly DataUserComandHandler _RepoData;

        public DataUserController(DataUserComandHandler repoData)
        {
            _RepoData = repoData;
        }

        
    }
}
