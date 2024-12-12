using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.MyAllLoan
{
    public class GetMyLoansQueryResponse
    {
        public Guid IdLoan { get; set; }
        public DateTime nextExpirationDate {  get; set; }
        public decimal RemainingAmount { get; set; }
        public decimal PayedPercentage { get; set; }
        public StateLoan StateLoan { get; set; }
        public string CurrentQuota { get; set; }
        public decimal QuotaValue { get; set; }
        public ListType ListType { get; set; }
        public GetMyLoansQueryResponse(Guid idLoan, DateTime nextExpirationDate, decimal remainingAmount, decimal payedPercentage, StateLoan stateLoan, string currentQuota, decimal quotaValue, ListType listType)
        {
            IdLoan = idLoan;
            this.nextExpirationDate = nextExpirationDate;
            RemainingAmount = remainingAmount;
            PayedPercentage = payedPercentage;
            StateLoan = stateLoan;
            CurrentQuota = currentQuota;
            QuotaValue = quotaValue;
            ListType = listType;
        }
    }
}
