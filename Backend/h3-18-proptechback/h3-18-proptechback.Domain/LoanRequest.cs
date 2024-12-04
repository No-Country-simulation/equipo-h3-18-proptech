using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class LoanRequest : BaseEntity
    {
        public Guid DataUserId { get; set; }
        public DataUser DataUser { get; set; }
        public decimal LotCost { get; set; }
        public decimal DownPayment { get; set; }
        public int QuotasCount { get; set; }
        public StateRequest StateRequest { get; set; }
    }

}
