using h3_18_proptechback.Domain.Common;


namespace h3_18_proptechback.Domain
{
    public class Investmant: BaseEntity
    {
        public decimal CurrentAmount { get; set; }

        public DateTime? DatePayment { get; set; }

        public bool IsActive { get; set; }

        public bool IsPayed { get; set; }

        public decimal TotalProfit { get; set; }

        public ICollection<InvestmentFee> InvestmentFees { get; set; }

    }
}
