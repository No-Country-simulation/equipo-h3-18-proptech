namespace h3_18_proptechback.Application.Features.LoanRequest.Command.RejectLoanRequest
{
    public class RejectLoanRequestCommand
    {
        public Guid LoanRequestId { get; set; }

        public RejectLoanRequestCommand(Guid loanRequestId)
        {
            LoanRequestId = loanRequestId;
        }
    }
}
