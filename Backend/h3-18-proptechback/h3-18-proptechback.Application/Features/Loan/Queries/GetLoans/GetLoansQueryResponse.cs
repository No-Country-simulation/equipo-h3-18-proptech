using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Domain.Common;
namespace h3_18_proptechback.Application.Features.Loan.Queries.AllLoan
{
    public class GetLoansQueryResponse
    {
        public Guid LoanId { get; set; }
        public string FullName { get; set; }
        public StateLoan StateLoan { get; set; }    
        public int LateQuotas { get; set; }
        public ListType ListType { get; set; }

        public GetLoansQueryResponse(Guid loanId, int lateQuotas, StateLoan stateLoan, string fullName, ListType listType)
        {
            LoanId = loanId;
            LateQuotas = lateQuotas;
            StateLoan = stateLoan;
            FullName = fullName;
            ListType = listType;
        }
    }
}
