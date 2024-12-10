using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser
{
    public class ValidateUserCommandHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        public ValidateUserCommandHandler(IDataUserRepository dataUserRepository)
        {
            _dataUserRepository = dataUserRepository;
        }
        public async Task<string> HandleAsync(ValidateUserCommand command)
        {
            if (await _dataUserRepository.IsValidUserByDNI(command.DNI))
            {
                await _dataUserRepository.ValidateUser(command.DNI);
                return "¡Validación realizada con éxito!";
            }
            throw new ArgumentException($"Usuario con DNI: {command.DNI} inexistente.");
        }
    }
}
