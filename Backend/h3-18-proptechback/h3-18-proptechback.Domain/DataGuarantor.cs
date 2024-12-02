
using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DataGuarantor : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DNI { get; set; }
        public string CUIT { get; set; }
        public Guid DataUserId {  get; set; }
        public DataUser DataUser { get; set; }
        public StateValidation StateValidation { get; set; }
    }
}
