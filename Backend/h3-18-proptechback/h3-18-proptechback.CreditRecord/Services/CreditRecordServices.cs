
using h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord;
using h3_18_proptechback.CreditRecord.Models.Requets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace h3_18_proptechback.CreditRecord.Services
{
    public class CreditRecordServices : ICreditRecordServices<DeudasRequest>
    {
        public readonly HttpClient _client;

        public readonly JsonSerializerOptions _options;

        public CreditRecordServices(HttpClient client, JsonSerializerOptions options)
        {
            _client = client;
            _options = options;
        }

        public async Task<List<DeudasRequest>> ObtenerChequesRechazados(DeudasRequest request)
        {
            var reponse = await _client.GetAsync("v1.0/Deudas/{request.identificacion}" + request.identificacion);
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<DeudasRequest>>(content);
        }

        public async Task<List<DeudasRequest>?> ObtenerDeudas(DeudasRequest request)
        {
            var reponse = await _client.GetAsync("v1.0/Deudas/Historicas/{request.identificacion}" + request.identificacion);
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<DeudasRequest>>(content);
        }

        public async Task<List<DeudasRequest>> ObtenerHistoria(DeudasRequest request)
        {
            var reponse = await _client.GetAsync("v1.0/Deudas/Historicas/{request.identificacion}" + request.identificacion);
            var content = await reponse.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<DeudasRequest>>(content);
        }
    }
}
