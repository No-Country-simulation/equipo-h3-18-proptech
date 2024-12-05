using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan;

namespace h3_18_proptechback.Application.Features.Loan.Queries
{
    public class LoanRequestQueryHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IUserIdentityService _userIdentityService;
        private readonly ILoanRepository _loanRepository;

        public LoanRequestQueryHandler(ILoanRequestRepository loanRequestRepository, IUserIdentityService userIdentityService,
            ILoanRepository loanRepository)
        {
            _loanRequestRepository = loanRequestRepository;
            _userIdentityService = userIdentityService;
            _loanRepository = loanRepository;
        }

        public async Task<List<AllReqLoanQueryResponse>> GetAllRequestLoan()
        {
            var requestPending = await _loanRequestRepository.GetPendingLoanRequest();
            List<AllReqLoanQueryResponse> requestLoanResponses = new List<AllReqLoanQueryResponse>();
            foreach(var request in requestPending)
            {
                var userOfRequest = await _userIdentityService.GetByIdIdentityUser(request.DataUser.Createby!);
                requestLoanResponses.Add(
                    new AllReqLoanQueryResponse(string.Concat(userOfRequest.Name, " ", userOfRequest.LastName),
                    (request.LotCost - request.DownPayment),
                    request.ID));
            }

            return requestLoanResponses;
        }

        public async Task<List<AllLoanQueryResponse>> GetAllLoan(AllLoanQuery query)
        {
            var loans = await _loanRepository.GetAllLoanIncludeQuotas(query.StateLoan);

            List<AllLoanQueryResponse> list = new List<AllLoanQueryResponse>();
            foreach(var loan in loans)
            {
                var user = await _userIdentityService.GetByIdIdentityUser(loan.LoanRequest.DataUser.Createby!);
                var lateQuotas = loan.Quotas.Where(l => l.State == Domain.Common.StateQuota.Late).Count();
                list.Add(new AllLoanQueryResponse(loan.ID, lateQuotas, loan.StateLoan, string.Concat(user.Name, " ", user.LastName)));
            }

            if(!string.IsNullOrEmpty(query.Name))
                list = list.Where(d=>d.FullName.Contains(query.Name, StringComparison.OrdinalIgnoreCase)).ToList();

            return list;
        }
    }
}
