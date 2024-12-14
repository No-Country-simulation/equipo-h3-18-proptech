using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.MercadoPago.Models;
using MercadoPago.Client.Payment;
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

        public async Task<string> CreateAndGetPreferenceID(string title, decimal price, DateTime eventDate, string externalReference, string backUrl, DateTime? expirationDate = null)
        {
            MercadoPagoConfig.AccessToken = _configuration.AccessToken;
            var request = new PreferenceRequest
            {
                Items = new List<PreferenceItemRequest>
                {
                    new PreferenceItemRequest
                    {
                        Title = title,
                        Quantity = 1,
                        UnitPrice = price,
                        CurrencyId = "ARS",
                        EventDate = eventDate,
                    }
                },
                ExternalReference = externalReference,
                AutoReturn = "all",
                BackUrls = new PreferenceBackUrlsRequest
                {
                    Failure = backUrl,
                    Pending = backUrl,
                    Success = backUrl
                },
                DateOfExpiration = expirationDate
            };

            var client = new PreferenceClient();
            Preference pref = await client.CreateAsync(request);
            return pref.Id;
        }

        public async Task<Guid?> GetIdQuota(string idPayment)
        {
            MercadoPagoConfig.AccessToken = _configuration.AccessToken;
            var client = new PaymentClient();
            var payment = await client.GetAsync(long.Parse(idPayment));
            
            if (payment.Status == "approved")
            {
                return new Guid(StringFormatToGuid(payment.ExternalReference));
            }
            return null;
        }

        private string StringFormatToGuid(string value)
        {
            string valueR = $"{value.Substring(0, 8)}-" +
                    $"{value.Substring(8, 4)}-" +
                    $"{value.Substring(12, 4)}-" +
                    $"{value.Substring(16, 4)}-" +
                    $"{value.Substring(20)}";
            return valueR;
        }
    }
}
