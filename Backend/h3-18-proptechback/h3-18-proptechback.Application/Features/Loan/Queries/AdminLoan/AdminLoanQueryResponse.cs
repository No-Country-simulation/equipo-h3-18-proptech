using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AdminLoan
{
    public class AdminLoanQueryResponse
    {
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public StateQuota? StateQuota { get; set; }
        public Guid LoanId { get; set; }
        public ListType ListType { get; set; }
        public List<QuotaQueryResponse> Quotas { get; set; }
        public AdminLoanQueryResponse(int page, int totalPages, StateQuota? stateQuota, List<QuotaQueryResponse> quotas, Guid loanId, ListType listType)
        {
            Page = page;
            TotalPages = totalPages;
            StateQuota = stateQuota;
            Quotas = quotas;
            LoanId = loanId;
            ListType = listType;
        }
    }

    public class QuotaQueryResponse
    {
        public Guid QuotaId { get; set; }
        public string QuotaNumber { get; set; }
        public DateTime ExpiredDate { get; set; }
        public StateQuota StateQuota { get; set; }
        public decimal Amount { get; set; }
        public QuotaQueryResponse(Guid quotaId, string quotaNumber, DateTime expiredDate, StateQuota stateQuota, decimal amount)
        {
            QuotaId = quotaId;
            QuotaNumber = quotaNumber;
            ExpiredDate = expiredDate;
            StateQuota = stateQuota;
            Amount = amount;
        }
    }
}
