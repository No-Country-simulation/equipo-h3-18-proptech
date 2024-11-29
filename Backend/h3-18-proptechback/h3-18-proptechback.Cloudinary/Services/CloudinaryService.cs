using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Cloudinary.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace h3_18_proptechback.Cloudinary.Services
{
    internal class CloudinaryService : ICloudinaryService
    {
        private readonly CloudinaryDotNet.Cloudinary _cloudinary;
        public CloudinaryService(IOptions<CloudinarySettings> options)
        {
            _cloudinary = new CloudinaryDotNet.Cloudinary(new Account(options.Value.CloudName,options.Value.ApiKey, options.Value.ApiSecret));
            _cloudinary.Api.Secure = true;
        }

        public async Task<string?> UploadMedia(IFormFile file)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription
                {
                    FileName = file.FileName,
                    Stream = stream
                },
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = false
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.Url.ToString();
        }
    }
}
