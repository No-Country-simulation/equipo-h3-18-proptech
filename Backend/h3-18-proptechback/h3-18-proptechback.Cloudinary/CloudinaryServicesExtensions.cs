using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Cloudinary.Models;
using h3_18_proptechback.Cloudinary.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace h3_18_proptechback.Cloudinary
{
    public static class CloudinaryServicesExtensions
    {
        public static IServiceCollection AddCloudinaryServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            return services;
        }
    }
}
