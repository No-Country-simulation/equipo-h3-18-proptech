using System.Text.Json.Serialization;

namespace h3_18_proptechback.Application.Features.WebHook.Commands.ApproveCuotaPayment
{
    public class PayQuotaCommand
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }
        [JsonPropertyName("live_mode")]
        public bool LiveMode { get; set; }
        [JsonPropertyName("type")]
        public string Type { get; set; }
        [JsonPropertyName("date_created")]
        public DateTime DateCreated { get; set; }
        [JsonPropertyName("user_id")]
        public string UserId { get; set; }
        [JsonPropertyName("api_version")]
        public string ApiVersion { get; set; }
        [JsonPropertyName("action")]
        public string Action { get; set; }
        [JsonPropertyName("data")]
        public NotificationData Data { get; set; }
        public class NotificationData
        {
            [JsonPropertyName("id")]
            public string Id { get; set; } // Este sería el payment_id que necesitas consultar
        }

    }
}
