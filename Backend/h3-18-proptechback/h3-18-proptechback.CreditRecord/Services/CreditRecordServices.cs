using h3_18_proptechback.CreditRecord.Models.Requets;
using System.Text.Json;
namespace h3_18_proptechback.CreditRecord.Services
{
    public class CreditRecordServices
    {
        public readonly HttpClient _client;

        public CreditRecordServices(HttpClient client)
        {
            _client = client;
        }

        public async Task<int> GetCreditScore(DeudasRequest request)
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
            var averageByPeriodo = periodos.Select(p =>
            {
                var result = p.Entidades.Where(e => e.Situacion > 0 && e.Situacion <= 5)
                .Average(e => e.Situacion);

                return result;
            }).ToList();

            var resultAverage = Math.Round(averageByPeriodo.Average());
            return Convert.ToInt32(resultAverage);
        }

        public async Task<ApiResponse> ObtenerDeudasAsync(DeudasRequest request)
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

        public async Task<ApiResponse> ObtenerHistoriaAsync(DeudasRequest request)
        {
            var reponse = await _client.GetAsync($"v1.0/Deudas/Historicas/{request.identificacion}");
            reponse.EnsureSuccessStatusCode();
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ApiResponse>(content);
        }

        public async Task<List<DeudasRequest>> ObtenerChequesRechazadosAsync(DeudasRequest request)
        {
            var reponse = await _client.GetAsync($"v1.0/Deudas/{request.identificacion}");
            reponse.EnsureSuccessStatusCode();
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<DeudasRequest>>(content);
        }
    }
}
