using h3_18_proptechback.Application.Contracts.Persistence;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using h3_18_proptechback.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace h3_18_proptechback.Infrastructure
{
    public static class ApplicationInfrastructureServicesExtensions
    {
        public static IServiceCollection AddApplicationInfrastructureServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(dbContextOptionsBuilder =>
            {
                dbContextOptionsBuilder.UseNpgsql(configuration.GetConnectionString("ConnetionSting"));
            });
            services.AddScoped<IDataUserRepository, DataUserRepository>();
            services.AddScoped<IDocumentsUserRepository, DocumentsUserRepository>();

            return services;
               
        }

    }
}
