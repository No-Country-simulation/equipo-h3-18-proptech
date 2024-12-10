using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.ValidateLoanRequest
{
    public class ValidateLoanRequestCommand
    {
        public Guid LoanRequestId { get; set; }

        public ValidateLoanRequestCommand(Guid loanRequestId)
        {
            LoanRequestId = loanRequestId;
        }
    }
}
