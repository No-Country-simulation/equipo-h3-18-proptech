using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DocumentsUser : BaseEntity
    {
        public Guid DataUserID { get; set;}
        
        public DataUser DataUser { get; set; }
        
        public string PhotoURL { get; set; }
        
        public string FrontDNIURL { get; set; }
        
        public string BackDNIURL { get; set; }
        
        public string? SalaryURL { get; set; }
        
        public string? ProofAddressURL { get; set; }
    }
}
