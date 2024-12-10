using h3_18_proptechback.Domain.Common;
namespace h3_18_proptechback.Application.Features.Loan.Queries.Common
{
    public class DetailsLoanQuery
    {
        public Guid LoanId { get; set; }
        public int Page { get; set; }
        public StateQuota? StateQuota { get; set; }
        public DetailsLoanQuery(int page, StateQuota? stateQuota, Guid loanId)
        {
            Page = page;
            StateQuota = stateQuota;
            LoanId = loanId;
        }
    }
}
