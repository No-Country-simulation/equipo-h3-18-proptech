using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.DolarAPI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace h3_18_proptechback.DolarAPI
{
    public static class DolarAPIServicesExtensions
    {
        public static IServiceCollection AddDolarAPIServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient("DolarAPI", client =>
            {
                client.BaseAddress = new Uri(configuration.GetValue<string>("dolarAPIURL"));
            });

            services.AddScoped<IDolarService, DolarService>();
            return services;
        }
    }
}
