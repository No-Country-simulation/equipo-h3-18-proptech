using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue.Command;
using Microsoft.Extensions.DependencyInjection;

using h3_18_proptechback.Application.Models.Identity;


namespace h3_18_proptechback.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddAplicationService(this IServiceCollection service)
        {
            
            service.AddScoped<DataUserCommandHandler>();

            return service;

        }
    }
}