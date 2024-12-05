using FluentValidation;
using FluentValidation.AspNetCore;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.DataUserValue.Command;
using h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Application.Features.DataUserValue.Queries;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries;
using h3_18_proptechback.Application.Features.Loan.Queries;
using h3_18_proptechback.Application.Features.Loan.Command;


namespace h3_18_proptechback.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddAplicationService(this IServiceCollection service)
        {
            
            service.AddScoped<DataUserCommandHandler>();
            service.AddScoped<DataUserQueriesHandler>();
            service.AddScoped<CreditSimulatorCommandHandler>();
            service.AddScoped<ValidateIdentityCommandHandler>();
            service.AddScoped<ValidateIdentityQueryHandler>();
            service.AddScoped<RequestLoanCommandHandler>();
            service.AddScoped<LoanQueryHandler>();

            service.AddFluentValidationAutoValidation();
            service.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return service;

        }
    }
}