using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Domain;
using h3_18_proptechback.MercadoPago.Models;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using Microsoft.Extensions.Options;

namespace h3_18_proptechback.MercadoPago.Services
{
    internal class MercadoPagoService : IMercadoPagoService
    {
        private readonly MercadoPagoConfiguration _configuration;
        private readonly IDolarService _dolarService;

        public MercadoPagoService(IOptions<MercadoPagoConfiguration> options,
            IDolarService dolarService)
        {
            _configuration = options.Value;
            _dolarService = dolarService;
        }
        public async Task<string> CreateAndGetPreferenceID(Quota quota)
        {
            MercadoPagoConfig.AccessToken = _configuration.AccessToken;
            var request = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
                {
                    new PreferenceItemRequest
                    {
                        Title = $"Pago de cuota N°{quota.QuotaNumber}",
                        Quantity = 1,
                        UnitPrice = await _dolarService.GetValueInARS(quota.Amount),
                        CurrencyId = "ARS",
                        EventDate = quota.CreatedDate,
                    }
                },
                ExternalReference = quota.ID.ToString(),
                AutoReturn = "all",
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Failure = "https://equipo-h3-18-proptech-desarrollo.onrender.com/buyer",
                    Pending = "https://equipo-h3-18-proptech-desarrollo.onrender.com/buyer",
                    Success = "https://equipo-h3-18-proptech-desarrollo.onrender.com/buyer"
                },
                DateOfExpiration = null
            };

            var client = new PreferenceClient();
            Preference pref = await client.CreateAsync(request);
            return pref.Id;
        }
    }
}
