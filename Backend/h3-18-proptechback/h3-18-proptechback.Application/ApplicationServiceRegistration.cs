using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUser;
using Microsoft.Extensions.DependencyInjection;


namespace h3_18_proptechback.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddAplicationService(this IServiceCollection service)
        {
            service.AddScoped<DataUserComandHandler>();

            return service;

        }
    }
}