using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.GetDashboardLoan
{
    public class GetDashboardLoanQuery
    {
        public int Page { get; set; }
        public bool OrderByDateDesc { get; set; }
        public StateLoan LoanState { get; set; }
    }
}
