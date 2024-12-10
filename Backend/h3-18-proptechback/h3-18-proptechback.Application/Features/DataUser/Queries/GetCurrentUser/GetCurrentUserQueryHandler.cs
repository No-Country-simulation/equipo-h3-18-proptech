using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;

namespace h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser
{
    public class GetCurrentUserQueryHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        public GetCurrentUserQueryHandler(IUserIdentityService userIdentityService, IDataUserRepository dataUserRepository)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
        }
        public async Task<GetCurrentUserQueryResponse> HandleAsync(string email)
        {
            var userResponse = await _userIdentityService.GetIdentityUser(email);

            var currentUserResponse = new GetCurrentUserQueryResponse(userResponse.Name, userResponse.LastName, userResponse.Email, userResponse.PhoneNumber);

            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(userResponse.Id);

            if (dataUser is null)
            {
                currentUserResponse.StateValidation = Domain.Common.StateRequest.NoValid;
                currentUserResponse.CUIT = null;
                currentUserResponse.DNI = null;
            }
            else
            {
                currentUserResponse.CUIT = dataUser.CUIT;
                currentUserResponse.DNI = dataUser.DNI;
                currentUserResponse.StateValidation = dataUser.StateValidation;
            }

            return currentUserResponse;
        }
    }
}
