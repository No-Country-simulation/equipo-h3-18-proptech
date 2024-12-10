using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.RejectLoanRequest
{
    public class RejectLoanRequestCommandHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        public RejectLoanRequestCommandHandler(ILoanRequestRepository loanRequestRepository)
        {
            _loanRequestRepository = loanRequestRepository;
        }
        public async Task<string> HandleAsync(RejectLoanRequestCommand command)
        {
            var loanUpdated = await _loanRequestRepository.RejectPendingLoanRequest(command.LoanRequestId);
            return "¡Solicitud de préstamo rechazada con exito!";
        }
    }
}
