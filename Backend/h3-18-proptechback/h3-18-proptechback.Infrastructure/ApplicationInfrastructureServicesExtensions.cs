using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace h3_18_proptechback.Infrastructure
{
    public static class ApplicationInfrastructureServicesExtensions
    {
        public static void AddApplicationInfrastructureServicesExtensions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(dbContextOptionsBuilder =>
            {
                dbContextOptionsBuilder.UseNpgsql(configuration.GetConnectionString("ConnetionSting"));
            });

            

           
        }
    }
}
