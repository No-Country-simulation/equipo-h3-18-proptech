using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class Quota : BaseEntity
    {
        public Guid LoanId { get; set; }
        public Loan Loan { get; set; }
        public int QuotaNumber { get; set; }
        public DateTime PayDate { get; set; }
        public StateQuota State { get; set; }
        public decimal Amount { get; set; }
        public string PreferenceID { get; set; }
    }
}
