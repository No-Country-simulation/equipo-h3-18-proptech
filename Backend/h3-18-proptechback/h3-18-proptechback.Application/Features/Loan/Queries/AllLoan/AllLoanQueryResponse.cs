using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AllLoan
{
    public class AllLoanQueryResponse
    {
        public Guid LoanId { get; set; }
        public string FullName { get; set; }
        public StateLoan StateLoan { get; set; }    
        public int LateQuotas { get; set; }

        public AllLoanQueryResponse(Guid loanId, int lateQuotas, StateLoan stateLoan, string fullName)
        {
            LoanId = loanId;
            LateQuotas = lateQuotas;
            StateLoan = stateLoan;
            FullName = fullName;
        }
    }
}
