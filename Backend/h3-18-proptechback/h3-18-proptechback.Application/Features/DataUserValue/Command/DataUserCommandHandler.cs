using AutoMapper;
using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser;
using h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser;
using h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateIdentityFiles;
using h3_18_proptechback.Domain;
using Microsoft.AspNetCore.Identity;


namespace h3_18_proptechback.Application.Features.DataUserValue.Command
{
    public class DataUserCommandHandler
    {
        private readonly IDataUserRepository _dataRepo;
        private readonly ValidateIdentityCommandHandler _filesHandler;
        private readonly IUserIdentityService _userIdentityService;
        private readonly IMapper _mapper;

        public DataUserCommandHandler(IDataUserRepository dataRepo, ValidateIdentityCommandHandler filesHandler,
            IUserIdentityService userIdentityService)
        {
            _dataRepo = dataRepo;
            _filesHandler = filesHandler;
            _userIdentityService = userIdentityService;
        }
        public async Task<string> Add(AddUserCommand command, string email)
        {
            if (command is null)
                throw new ArgumentException("El usuario proporcionado no puede ser nulo. Verifique los campos enviados.");

            if (await _dataRepo.IsValidUserByDNI(command.DNI))
                throw new ArgumentException($"El usuario con DNI: {command.DNI} ya existe");
            var user = await _userIdentityService.GetIdentityUser(email);
            var userExists = await _dataRepo.GetUserByGuidIdentity(user.Id);

            if (userExists is not null)
                throw new ArgumentException("Ya existe una solicitud de validación de identidad");

            DataUser entityToAdd = new DataUser
            {
                DNI = command.DNI,
                CUIT = command.CUIT,
                Createby = "System",
                StateValidation = Domain.Common.StateValidation.Pending,
                CreatedDate = DateTime.Now.ToUniversalTime(),
                IdentityUserId = user.Id
            };

            await _dataRepo.Add(entityToAdd);
            if (!await _filesHandler.ReceiveFiles(new ValidateIdentityFilesCommand(command.Photo, command.Front, command.Back, command.DNI, true)))
                throw new Exception("Error al subir los archivos. Intente nuevamente.");

            return "¡Validación solicitada con éxito! Un operador revisará su solicitud.";
        }

        public async Task<UpdateUserCommandResponse> UpdateUser(UpdateUserCommand command, string currentEmail)
        {
            var userToken = await _userIdentityService.UpdateEmailPhone(currentEmail, command.Email, command.PhoneNumber);

            return new UpdateUserCommandResponse("¡Usuario actualizado con exito!", userToken);
        }

        //public async Task<VMDataUser> Update(DataUser entity)
        //{
        //    var existe = _dataRepo.GetIdAsync(entity.ID);

        //    if (existe == null)
        //        throw new Exception($"el registro{entity.DNI} no existe");

        //    await _dataRepo.Update(entity);

        //    var newDataUser = new VMDataUser
        //    {
        //        CUIT = entity.CUIT,
        //        DNI = entity.DNI,
        //    };

        //    return _mapper.Map<VMDataUser>(newDataUser);
        //}

        //public async Task<bool> Delete(Guid id)
        //{
        //    var existe = _dataRepo.GetIdAsync(id);
        //    if (existe == null)
        //    {
        //        throw new Exception($"el registro{id} no existe");

        //    }
        //    await _dataRepo.Delete(id);
        //    return true;
        //}

    }
}
