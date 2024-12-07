using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DocumentsUser.Command.AddDocumentsUser;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddUser
{
    public class AddUserCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IEmailServices _emailServices;
        private readonly AddDocumentsUserCommandHandler _addDocumentsUserCommandHandler;
        public AddUserCommandHandler(IUserIdentityService userIdentityService, IDataUserRepository dataRepo,
            IEmailServices emailServices, AddDocumentsUserCommandHandler addDocumentsUserCommandHandler)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataRepo;
            _emailServices = emailServices;
            _addDocumentsUserCommandHandler = addDocumentsUserCommandHandler;
        }
        public async Task<string> HandleAsync(AddUserCommand command, string email)
        {
            if (command is null)
                throw new ArgumentException("El usuario proporcionado no puede ser nulo. Verifique los campos enviados.");
            var user = await _userIdentityService.GetIdentityUser(email);

            if (await _dataUserRepository.IsValidUserByDNI(command.DNI) && !await _dataUserRepository.IsMine(command.DNI, user.Id))
                throw new ArgumentException($"El usuario con DNI: {command.DNI} ya existe");

            var userExists = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (userExists is not null && userExists.StateValidation is Domain.Common.StateRequest.NoValid)
            {
                var getCurrentDataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);
                getCurrentDataUser.DNI = command.DNI;
                getCurrentDataUser.CUIT = command.CUIT;
                getCurrentDataUser.CreatedDate = DateTime.Now.ToUniversalTime();
                getCurrentDataUser.StateValidation = Domain.Common.StateRequest.Pending;

                await _dataUserRepository.Update(getCurrentDataUser);

                if (!await _addDocumentsUserCommandHandler.HandleAsync(new AddDocumentsUserCommand(command.Photo, command.Front, command.Back, command.DNI, true, true)))
                    throw new Exception("Error externo al servidor");

            }
            else if (userExists is not null && (userExists.StateValidation is Domain.Common.StateRequest.Pending || userExists.StateValidation is Domain.Common.StateRequest.Valid))
                throw new ArgumentException("Ya existe una solicitud de validación de identidad");
            else
            {
                DataUser entityToAdd = new DataUser
                {
                    DNI = command.DNI,
                    CUIT = command.CUIT,
                    Createby = user.Id,
                    StateValidation = Domain.Common.StateRequest.Pending,
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                };

                await _dataUserRepository.Add(entityToAdd);
                if (!await _addDocumentsUserCommandHandler.HandleAsync(new AddDocumentsUserCommand(command.Photo, command.Front, command.Back, command.DNI, true, false)))
                    throw new Exception("Error externo al servidor");
            }



            await _emailServices.SendEmailAsync(new Models.Emails.Email
            {
                TO = email,
                Subject = "Usuario Valido Exitoso",
                Body = "¡Su Validación solicitada con éxito! Un operador revisará su solicitud."
            });


            return "¡Su Validación solicitada con éxito! Un operador revisará su solicitud.";
        }
    }
}
