using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;

namespace h3_18_proptechback.Application.Features.DocumentsUser.Command.AddDocumentsUser
{
    public class AddDocumentsUserCommandHandler
    {
        private readonly ICloudinaryService _cloudinaryService;  
        private readonly IDocumentsUserRepository _documentsUserRepository;
        public AddDocumentsUserCommandHandler(IDocumentsUserRepository documentsUserRepository, ICloudinaryService cloudinaryService)
        {
            _documentsUserRepository = documentsUserRepository;
            _cloudinaryService = cloudinaryService;
        }

        public async Task<bool> HandleAsync(AddDocumentsUserCommand command)
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

            if (!command.IsOverride)
                await _documentsUserRepository.AddDocumentsValidateIdentity(results!, command.DNI);
            else
                await _documentsUserRepository.OverrideDocumentsValidateIdentity(results!, command.DNI);

            return true;
        }
    }
}
