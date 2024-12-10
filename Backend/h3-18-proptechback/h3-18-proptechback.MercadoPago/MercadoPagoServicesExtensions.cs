using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.MercadoPago.Models;
using h3_18_proptechback.MercadoPago.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace h3_18_proptechback.MercadoPago
{
    public static class MercadoPagoServicesExtensions
    {
        public static IServiceCollection AddMercadoPagoServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MercadoPagoConfiguration>(configuration.GetSection("MercadoPagoConfiguration"));
            services.AddScoped<IMercadoPagoService, MercadoPagoService>();
            return services;
        }
    }
}
