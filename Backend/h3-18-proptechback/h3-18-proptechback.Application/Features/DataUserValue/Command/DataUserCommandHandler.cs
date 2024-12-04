using AutoMapper;
using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
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
        private readonly IEmailServices _emailServices;


        public DataUserCommandHandler(IDataUserRepository dataRepo, ValidateIdentityCommandHandler filesHandler,
            IUserIdentityService userIdentityService, IEmailServices emailServices)
        {
            _dataRepo = dataRepo;
            _filesHandler = filesHandler;
            _userIdentityService = userIdentityService;
            _emailServices = emailServices;
        }
        public async Task<string> Add(AddUserCommand command, string email)
        {
            if (command is null)
                throw new ArgumentException("El usuario proporcionado no puede ser nulo. Verifique los campos enviados.");
            var user = await _userIdentityService.GetIdentityUser(email);

            if (await _dataRepo.IsValidUserByDNI(command.DNI) && !await _dataRepo.IsMine(command.DNI, user.Id))
                throw new ArgumentException($"El usuario con DNI: {command.DNI} ya existe");

            var userExists = await _dataRepo.GetUserByGuidIdentity(user.Id);

            if (userExists is not null && userExists.StateValidation is Domain.Common.StateRequest.NoValid)
            {
                var getCurrentDataUser = await _dataRepo.GetUserByGuidIdentity(user.Id);
                getCurrentDataUser.DNI = command.DNI;
                getCurrentDataUser.CUIT = command.CUIT;
                getCurrentDataUser.CreatedDate = DateTime.Now.ToUniversalTime();
                getCurrentDataUser.StateValidation = Domain.Common.StateRequest.Pending;

                await _dataRepo.Update(getCurrentDataUser);

                if (!await _filesHandler.ReceiveFiles(new ValidateIdentityFilesCommand(command.Photo, command.Front, command.Back, command.DNI, true), true))
                    throw new Exception("Error externo al servidor");

            }
            else if(userExists is not null && (userExists.StateValidation is Domain.Common.StateRequest.Pending || userExists.StateValidation is Domain.Common.StateRequest.Valid))
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

                await _dataRepo.Add(entityToAdd);
                if (!await _filesHandler.ReceiveFiles(new ValidateIdentityFilesCommand(command.Photo, command.Front, command.Back, command.DNI, true), false))
                    throw new Exception("Error externo al servidor");
            }
            
            

            await _emailServices.SendEmailAsync(new Application.Models.Emails.Email
            {
                TO = email,
                Subject = "Usuario Valido Exitoso",
                Body = "¡Su Validación solicitada con éxito! Un operador revisará su solicitud."
            });


            return "¡Su Validación solicitada con éxito! Un operador revisará su solicitud.";
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
