using h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord;
using h3_18_proptechback.Application.Models.Infrastructure;
using h3_18_proptechback.CreditRecord.Models.Requets;
using System.Text.Json;
namespace h3_18_proptechback.CreditRecord.Services
{
    public class CreditRecordServices : ICreditRecordService
    {
        public readonly HttpClient _client;

        public CreditRecordServices(HttpClient client)
        {
            _client = client;
        }

        public async Task<int> GetCreditScore(Application.Models.Infrastructure.DeudasRequest request)
        {
            var response = await _client.GetAsync($"v1.0/Deudas/Historicas/{request.identificacion}");

            if(!response.IsSuccessStatusCode)
            {
                throw new ArgumentException($"CUIT: {request.identificacion} no valido");
            }
            var content = JsonSerializer.Deserialize<ApiResponse>(await response.Content.ReadAsStringAsync());

            return GetAverageCreditScore(content.Results.Periodos);
        }

        public int GetAverageCreditScore(List<Periodo> periodos)
        {
            
            var situaciones = periodos
                .SelectMany(p => p.Entidades) 
                .Where(e => e.Situacion > 0 && e.Situacion <= 5)
                .Select(e => e.Situacion); 

            if (!situaciones.Any())
                return 0;

            var promedio = Math.Round(situaciones.Average());
            return Convert.ToInt32(promedio);
        }

        public async Task<ApiResponse> ObtenerDeudasAsync(Application.Models.Infrastructure.DeudasRequest request)
        {
            var reponse = await _client.GetAsync($"v1.0/Deudas/Historicas/{request.identificacion}");
            reponse.EnsureSuccessStatusCode();
            var content = await reponse.Content.ReadAsStringAsync();
            if (!reponse.IsSuccessStatusCode)
            {
                throw new ApplicationException(content);
            }
            return JsonSerializer.Deserialize<ApiResponse>(content);
        }

        public async Task<ApiResponse> ObtenerHistoriaAsync(Application.Models.Infrastructure.DeudasRequest request)
        {
            var reponse = await _client.GetAsync($"v1.0/Deudas/Historicas/{request.identificacion}");
            reponse.EnsureSuccessStatusCode();
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ApiResponse>(content);
        }

        public async Task<List<Application.Models.Infrastructure.DeudasRequest>> ObtenerChequesRechazadosAsync(Application.Models.Infrastructure.DeudasRequest request)
        {
            var reponse = await _client.GetAsync($"v1.0/Deudas/{request.identificacion}");
            reponse.EnsureSuccessStatusCode();
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<Application.Models.Infrastructure.DeudasRequest>>(content);
        }
    }
}
