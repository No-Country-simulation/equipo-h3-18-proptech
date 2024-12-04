using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DataUser : BaseEntity
    {
        public string DNI { get; set; }
        public string CUIT { get; set; }
        public StateRequest StateValidation { get; set; }    
    }
}
