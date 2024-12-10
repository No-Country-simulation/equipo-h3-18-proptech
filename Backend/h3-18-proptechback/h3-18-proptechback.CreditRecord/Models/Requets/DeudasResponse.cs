using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace h3_18_proptechback.CreditRecord.Models.Requets
{
    public class ApiResponse
    {
        [JsonPropertyName("status")]
        public int Status { get; set; }

        [JsonPropertyName("results")]
        public Results Results { get; set; }
    }

    public class Results
    {
        [JsonPropertyName("identificacion")]
        public long Identificacion { get; set; }

        [JsonPropertyName("denominacion")]
        public string Denominacion { get; set; }

        [JsonPropertyName("periodos")]
        public List<Periodo> Periodos { get; set; }
    }

    public class Periodo
    {
        [JsonPropertyName("periodo")]
        public string PeriodoId { get; set; }

        [JsonPropertyName("entidades")]
        public List<Entidad> Entidades { get; set; }
    }

    public class Entidad
    {
        [JsonPropertyName("entidad")]
        public string NombreEntidad { get; set; }

        [JsonPropertyName("situacion")]
        public int Situacion { get; set; }

        [JsonPropertyName("fechaSit1")]
        public string FechaSituacion1 { get; set; }

        [JsonPropertyName("monto")]
        public decimal Monto { get; set; }

        [JsonPropertyName("diasAtrasoPago")]
        public int DiasAtrasoPago { get; set; }

        [JsonPropertyName("refinanciaciones")]
        public bool Refinanciaciones { get; set; }

        [JsonPropertyName("recategorizacionOblig")]
        public bool RecategorizacionObligatoria { get; set; }

        [JsonPropertyName("situacionJuridica")]
        public bool SituacionJuridica { get; set; }

        [JsonPropertyName("irrecDisposicionTecnica")]
        public bool IrrecuperableDisposicionTecnica { get; set; }

        [JsonPropertyName("enRevision")]
        public bool EnRevision { get; set; }

        [JsonPropertyName("procesoJud")]
        public bool ProcesoJudicial { get; set; }
    }

}
