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
        public string? Salary2URL { get; set; }
        public string? Salary3URL { get; set; }
        public string? ProofAddressURL { get; set; }
        public Guid? LoanRequestId { get; set; }
        public LoanRequest? LoanRequest { get; set; }
    }
}
