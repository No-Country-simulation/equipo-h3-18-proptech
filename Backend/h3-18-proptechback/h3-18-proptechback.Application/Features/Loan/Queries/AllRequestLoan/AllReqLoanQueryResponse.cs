using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan
{
    public class AllReqLoanQueryResponse
    {
        public string FullName { get; set; }
        public decimal FinancingMount { get; set; }
        public Guid LoanRequestId { get; set; }
        public AllReqLoanQueryResponse(string fullName, decimal financingMount, Guid loanRequestId)
        {
            FullName = fullName;
            FinancingMount = financingMount;
            LoanRequestId = loanRequestId;
        }
    }
}
