using h3_18_proptechback.HostedServices.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace h3_18_proptechback.HostedServices
{
    public static class HostedServicesExtensions
    {
        public static IServiceCollection AddMercadoPagoServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHostedService<ApplyInteresLateQuotasService>();
            services.AddHostedService<ChangeQuotaToLateService>();
            return services;
        }
    }
}
