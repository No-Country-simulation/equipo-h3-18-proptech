using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries
{
    internal class ValidateIdentityQueryHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IUserIdentityService _userIdentityService;

        public ValidateIdentityQueryHandler(IDataUserRepository dataUserRepository,
            IUserIdentityService userIdentityService)
        {
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
        }

        public async Task<List<GetRequestValidationQueryResponse>> GetPendingRequest()
        {
            var dataUsers = _dataUserRepository.GetDataUserPending().ToList();
            dataUsers.Select(async d =>
            {
                var appUserForDataUser = await _userIdentityService.GetByIdIdentityUser(d.Createby!);
                return new GetRequestValidationQueryResponse()
                {
                    IdRequest = d.ID,
                    FullName = string.Concat(appUserForDataUser.Name, " ", appUserForDataUser.LastName),
                    Role = "hola"
                };
            }).ToList();
        }
    }
}
