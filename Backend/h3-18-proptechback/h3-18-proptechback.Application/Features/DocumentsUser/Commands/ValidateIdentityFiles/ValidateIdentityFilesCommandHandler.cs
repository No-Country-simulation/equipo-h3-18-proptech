using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence;

namespace h3_18_proptechback.Application.Features.DocumentsUser.Commands.ValidateIdentityFiles
{
    public class ValidateIdentityFilesCommandHandler
    {
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly ICloudinaryService _cloudinaryService;

        public ValidateIdentityFilesCommandHandler(IDocumentsUserRepository documentsUserRepository,
            ICloudinaryService cloudinaryService)
        {
            _documentsUserRepository = documentsUserRepository;
            _cloudinaryService = cloudinaryService;
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

                await _documentsUserRepository.AddDocumentsValidateIdentity(results!, command.DNI);

                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }
    }
}
