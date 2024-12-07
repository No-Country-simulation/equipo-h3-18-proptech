using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan
{
    public class ClientLoanQuery
    {
        public Guid LoanId { get; set; }
        public int Page { get; set; }
        public StateQuota? StateQuota { get; set; }
        public ClientLoanQuery(int page, StateQuota? stateQuota, Guid loanId)
        {
            Page = page;
            StateQuota = stateQuota;
            LoanId = loanId;
        }
    }
}
