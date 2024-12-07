using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.RejectUser
{
    public class RejectUserCommandHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        public RejectUserCommandHandler(IDataUserRepository dataUserRepository)
        {
            _dataUserRepository = dataUserRepository;
        }
        public async Task<string> HandleAsync(ValidateUserCommand command)
        {
            if (await _dataUserRepository.IsValidUserByDNI(command.DNI))
            {
                await _dataUserRepository.RejectUser(command.DNI);
                return "¡Validación rechazada con éxito!";
            }
            throw new ArgumentException($"Usuario con DNI: {command.DNI} inexistente.");
        }
    }
}
