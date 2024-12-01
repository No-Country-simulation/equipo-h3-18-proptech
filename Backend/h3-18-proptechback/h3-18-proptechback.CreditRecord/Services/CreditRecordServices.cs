
using h3_18_proptechback.CreditRecord.Models.Requets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace h3_18_proptechback.CreditRecord.Services
{
    public class CreditRecordServices
    {
        public interface ICreditRecordServices<T>
        {
            Task<List<T>?> ObtenerDeudasAsync(DeudasRequest request);

            Task<List<T>> ObtenerHistoriaAsync(DeudasRequest request);

            Task<List<T>> ObtenerChequesRechazadosAsync(DeudasRequest request);

        }

        public readonly HttpClient _client;

        public readonly JsonSerializerOptions _options;

        public CreditRecordServices(HttpClient client, JsonSerializerOptions options)
        {
            _client = client;
            _options = options;
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
