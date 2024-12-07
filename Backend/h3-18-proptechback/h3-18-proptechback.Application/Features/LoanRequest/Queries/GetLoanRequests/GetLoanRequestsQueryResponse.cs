namespace h3_18_proptechback.Application.Features.LoanRequest.Queries.GetLoanRequests
{
    public class GetLoanRequestsQueryResponse
    {
        public string FullName { get; set; }
        public decimal FinancingMount { get; set; }
        public Guid LoanRequestId { get; set; }
        public GetLoanRequestsQueryResponse(string fullName, decimal financingMount, Guid loanRequestId)
        {
            FullName = fullName;
            FinancingMount = financingMount;
            LoanRequestId = loanRequestId;
        }
    }
}
