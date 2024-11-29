using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;

namespace h3_18_proptechback.Application.Features.DocumentsUpload.Commands.ValidateIdentityFiles
{
    public class ValidateIdentityFilesCommandHandler
    {
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;

        public ValidateIdentityFilesCommandHandler(IDocumentsUserRepository documentsUserRepository,
            ICloudinaryService cloudinaryService, IDocumentsGuarantorRepository documentsGuarantorRepository)
        {
            _documentsUserRepository = documentsUserRepository;
            _cloudinaryService = cloudinaryService;
            _documentsGuarantorRepository = documentsGuarantorRepository;
        }

        public async Task<bool> ReceiveFiles(ValidateIdentityFilesCommand command)
        {
            if (command.Front is null || command.Back is null || command.Photo is null)
                return false;

            try
            {
                var uploadTasks = new Task<string?>[]
                {
                    _cloudinaryService.UploadMedia(command.Front),
                    _cloudinaryService.UploadMedia(command.Back),
                    _cloudinaryService.UploadMedia(command.Photo)
                };

                var results = await Task.WhenAll(uploadTasks);

                if (results.Any(string.IsNullOrEmpty))
                    return false;

                if(command.IsDataUser)
                    await _documentsUserRepository.AddDocumentsValidateIdentity(results!, command.DNI);
                else
                    await _documentsGuarantorRepository.AddDocumentsValidateIdentity(results!, command.DNI);

                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }
    }
}
