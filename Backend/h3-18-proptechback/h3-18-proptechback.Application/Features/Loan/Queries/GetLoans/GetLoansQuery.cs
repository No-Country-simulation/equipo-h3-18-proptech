using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AllLoan
{
    public class GetLoansQuery
    {
        public StateLoan? StateLoan { get; set; }
        public string? Name { get; set; }
        public GetLoansQuery(StateLoan? stateLoan, string? name)
        {
            StateLoan = stateLoan;
            Name = name;
        }
    }
}
