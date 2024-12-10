using h3_18_proptechback.Application.Contracts.Identity;

namespace h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser
{
    public class UpdateUserCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        public UpdateUserCommandHandler(IUserIdentityService userIdentityService)
        {
            _userIdentityService = userIdentityService;
        }
        public async Task<UpdateUserCommandResponse> HandleAsync(UpdateUserCommand command, string currentEmail)
        {
            var userToken = await _userIdentityService.UpdateEmailPhone(currentEmail, command.Email, command.PhoneNumber);

            return new UpdateUserCommandResponse("¡Usuario actualizado con exito!", userToken);
        }
    }
}
