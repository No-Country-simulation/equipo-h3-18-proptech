using AutoMapper;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateIdentityFiles;
using h3_18_proptechback.Domain;


namespace h3_18_proptechback.Application.Features.DataUserValue.Command
{
    public class DataUserCommandHandler
    {
        private readonly IDataUserRepository _dataRepo;
        private readonly ValidateIdentityCommandHandler _filesHandler;
        private readonly IMapper _mapper;

        public DataUserCommandHandler(IDataUserRepository dataRepo, ValidateIdentityCommandHandler filesHandler)
        {
            _dataRepo = dataRepo;
            _filesHandler = filesHandler;
        }
        public async Task<string> Add(AddUserCommand command)
        {
            if (command is null)
                throw new Exception("El usuario proporcionado no puede ser nulo. Verifique los campos enviados.");

            if (await _dataRepo.IsValidUserByDNI(command.DNI))
                throw new ArgumentException($"El usuario con DNI: {command.DNI} ya existe");

            DataUser entityToAdd = new DataUser
            {
                DNI = command.DNI,
                CUIT = command.CUIT,
                Createby = "System",
                IsComplete = false,
                CreatedDate = DateTime.Now.ToUniversalTime(),
            };

            await _dataRepo.Add(entityToAdd);
            if (!await _filesHandler.ReceiveFiles(new ValidateIdentityFilesCommand(command.Photo, command.Front, command.Back, command.DNI, true)))
                throw new Exception("Error al subir los archivos. Intente nuevamente.");

            return "¡Validación solicitada con éxito! Un operador revisará su solicitud.";
        }

        public async Task<VMDataUser> Update(DataUser entity)
        {
            var existe = _dataRepo.GetIdAsync(entity.ID);

            if (existe == null)
                throw new Exception($"el registro{entity.DNI} no existe");

            await _dataRepo.Update(entity);

            var newDataUser = new VMDataUser
            {
                CUIT = entity.CUIT,
                DNI = entity.DNI,
                IsComplete = entity.IsComplete,
            };

            return _mapper.Map<VMDataUser>(newDataUser);
        }

        public async Task<bool> Delete(Guid id)
        {
            var existe = _dataRepo.GetIdAsync(id);
            if (existe == null)
            {
                throw new Exception($"el registro{id} no existe");

            }
            await _dataRepo.Delete(id);
            return true;
        }

    }
}
