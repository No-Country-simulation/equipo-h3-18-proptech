using System.Text.Json.Serialization;

namespace h3_18_proptechback.DolarAPI.Models
{
    internal class DolarAPIResponse
    {
        [JsonPropertyName("moneda")]
        public string Moneda { get; set; }
        [JsonPropertyName("casa")]
        public string Casa { get; set; }
        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }
        [JsonPropertyName("compra")]
        public decimal Compra { get; set; }
        [JsonPropertyName("venta")]
        public decimal Venta { get; set; }
        [JsonPropertyName("fechaActualizacion")]
        public DateTime FechaActualizacion { get; set; }
    }
}
