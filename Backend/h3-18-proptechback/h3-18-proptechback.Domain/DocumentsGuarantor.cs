using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DocumentsGuarantor : BaseEntity
    {
        public Guid DataGuarantorID { get; set; }
        public DataGuarantor DataGuarantor { get; set; }
        public string PhotoURL { get; set; }
        public string FrontDNIURL { get; set; }
        public string BackDNIURL { get; set; }
        public string? SalaryURL { get; set; }
        public string? SalaryU2RL { get; set; }
        public string? Salary3URL { get; set; }
        public string? ProofAddressURL { get; set; }
        public Guid? LoanId { get; set; }
    }
}
