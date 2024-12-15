using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Models.Emails;
using h3_18_proptechback.Infrastructure.Email;
﻿using h3_18_proptechback.Application.Contracts.Persistence.DataGuarantor;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Contracts.Persistence.Quota;
using h3_18_proptechback.Infrastructure.Persistence;
using h3_18_proptechback.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;



namespace h3_18_proptechback.Infrastructure
{
    public static class ApplicationInfrastructureServicesExtensions
    {
        public static IServiceCollection AddApplicationInfrastructureServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(dbContextOptionsBuilder =>
            {
                dbContextOptionsBuilder.UseNpgsql(configuration.GetConnectionString("connetionString"));
            });
            services.AddScoped<IDataUserRepository, DataUserRepository>();
            services.AddScoped<IDataGuarantorRepository, DataGuarantorRepository>();
            services.AddScoped<IDocumentsUserRepository, DocumentsUserRepository>();
            services.AddScoped<IDocumentsGuarantorRepository, DocumentsGuarantorRepository>();
            services.AddScoped<ILoanRequestRepository, LoanRequestRepository>();
            services.AddScoped<ILoanRepository, LoanRepository>();
            services.AddScoped<IQuotaRepository, QuotaRepository>();
            services.AddScoped<IFinantialInvestmant, FinantialInvestmantRepository>();
            services.AddScoped<IFinatialInvestmentFee, FinatialInvestmentFeeRepository>();

             
            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailServices, EmailService>();

            return services;
               
        }

    }
}
