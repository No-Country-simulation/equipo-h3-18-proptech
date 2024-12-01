
using h3_18_proptechback.CreditRecord.Models.configurations;
using h3_18_proptechback.CreditRecord.Models.Requets;
using h3_18_proptechback.CreditRecord.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using static h3_18_proptechback.CreditRecord.Services.CreditRecordServices;


namespace h3_18_proptechback.CreditRecord
{
    public static class CreditRecordServiceRegistration
    {
        public static IServiceCollection RecordCreditServices(this IServiceCollection services, IConfiguration configuration) 
        {
            
            services.AddSingleton(new JsonSerializerOptions());
            services.Configure<ApiSettings>(configuration.GetSection("apiUrl"));
            var apiUrl = configuration.GetValue<string>("apiUrl");
            services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(apiUrl) });
            services.AddScoped<CreditRecordServices>();

            return services;
        }
    }
}
