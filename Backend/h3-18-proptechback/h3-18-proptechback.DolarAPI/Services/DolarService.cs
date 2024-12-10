using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.DolarAPI.Models;
using System.Text.Json;

namespace h3_18_proptechback.DolarAPI.Services
{
    internal class DolarService : IDolarService
    {
        private readonly IHttpClientFactory _httpClient;

        public DolarService(IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<decimal> GetValueInARS(decimal valueInUS)
        {
            var client = _httpClient.CreateClient("DolarAPI");
            var result = await client.GetAsync("/v1/dolares/oficial");

            if (!result.IsSuccessStatusCode)
                throw new Exception("Error externo al servidor");
            string resultJson = await result.Content.ReadAsStringAsync();
            var apiResponse = JsonSerializer.Deserialize<DolarAPIResponse>(resultJson);
            return Math.Round(apiResponse.Venta * valueInUS, 2);

        }
    }
}
