using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddOtherDocuments;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateIdentityFiles;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands
{
    public class ValidateIdentityCommandHandler
    {
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;
        private readonly IDataUserRepository _dataUserRepository;

        public ValidateIdentityCommandHandler(IDocumentsUserRepository documentsUserRepository,
            ICloudinaryService cloudinaryService, IDocumentsGuarantorRepository documentsGuarantorRepository,
            IDataUserRepository dataUserRepository)
        {
            _documentsUserRepository = documentsUserRepository;
            _cloudinaryService = cloudinaryService;
            _documentsGuarantorRepository = documentsGuarantorRepository;
            _dataUserRepository = dataUserRepository;
        }

        public async Task<bool> ReceiveFiles(ValidateIdentityFilesCommand command, bool isOverride)
        {
            if (command.Front is null || command.Back is null || command.Photo is null)
                throw new ArgumentException("Los archivos no deben ser nulos");

            var uploadTasks = new Task<string?>[]
            {
                _cloudinaryService.UploadMedia(command.Front),
                _cloudinaryService.UploadMedia(command.Back),
                _cloudinaryService.UploadMedia(command.Photo)
            };

            var results = await Task.WhenAll(uploadTasks);

            if (results.Any(string.IsNullOrEmpty))
                return false;

            if (!isOverride)
                await _documentsUserRepository.AddDocumentsValidateIdentity(results!, command.DNI);
            else 
                await _documentsUserRepository.OverrideDocumentsValidateIdentity(results!, command.DNI);

            return true;
        }
        public async Task<string> ValidateUser(ValidateUserCommand command)
        {
            if (await _dataUserRepository.IsValidUserByDNI(command.DNI))
            {
                await _dataUserRepository.ValidateUser(command.DNI);
                return "¡Validación realizada con éxito!";
            }
            throw new ArgumentException($"Usuario con DNI: {command.DNI} inexistente.");
        }

        public async Task<string> RejectUser(ValidateUserCommand command)
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
