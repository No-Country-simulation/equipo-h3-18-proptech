using FluentValidation;
using FluentValidation.AspNetCore;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue.Command;
using h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;


namespace h3_18_proptechback.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddAplicationService(this IServiceCollection service)
        {
            service.AddScoped<DataUserCommandHandler>();
            service.AddScoped<CreditSimulatorCommandHandler>();

            service.AddFluentValidationAutoValidation();
            service.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return service;

        }
    }
}