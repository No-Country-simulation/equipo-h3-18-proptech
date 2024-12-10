using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation
{
    public class GetRequestValidationQueryHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IUserIdentityService _userIdentityService;
        public GetRequestValidationQueryHandler(IDataUserRepository dataUserRepository, IUserIdentityService userIdentityService)
        {
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
        }
        public async Task<List<GetRequestValidationQueryResponse>> HandleAsync()
        {
            var dataUsers = _dataUserRepository.GetAll();
            var dataUserfilt = dataUsers.Where(d => d.StateValidation == Domain.Common.StateRequest.Pending)
                .OrderBy(d => d.CreatedDate)
                .ToList();
            List<GetRequestValidationQueryResponse> list = new List<GetRequestValidationQueryResponse>();
            foreach (var requestValidation in dataUserfilt)
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
