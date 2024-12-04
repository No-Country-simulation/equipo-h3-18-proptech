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
    public class ValidateIdentityQueryHandler
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
            var dataUsers = _dataUserRepository.GetAll();
            var dataUserfilt = dataUsers.Where(d => d.StateValidation == Domain.Common.StateRequest.Pending)
                .OrderByDescending(d => d.CreatedDate)
                .ToList();
            List<GetRequestValidationQueryResponse> list = new List<GetRequestValidationQueryResponse>();
            foreach(var requestValidation in dataUserfilt)
            {
                var userOfDataUser = await _userIdentityService.GetByIdIdentityUser(requestValidation.Createby);
                list.Add(new GetRequestValidationQueryResponse
                {
                    DNI = requestValidation.DNI,
                    DateRequest = requestValidation.CreatedDate,
                    FullName = string.Concat(userOfDataUser.Name, " ", userOfDataUser.LastName),
                    Role = userOfDataUser.Role
                });
            }

            return list;
        }
    }
}
