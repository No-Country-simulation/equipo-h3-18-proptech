using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;

namespace h3_18_proptechback.Application.Features.LoanRequest.Queries.GetLoanRequests
{
    public class GetLoanRequestsQueryHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository; 
        private readonly IUserIdentityService _userIdentityService;
        public GetLoanRequestsQueryHandler(ILoanRequestRepository loanRequestRepository, IUserIdentityService userIdentityService)
        {
            _loanRequestRepository = loanRequestRepository;
            _userIdentityService = userIdentityService;
        }

        public async Task<List<GetLoanRequestsQueryResponse>> HandleAsync()
        {
            var requestPending = await _loanRequestRepository.GetPendingLoanRequest();
            List<GetLoanRequestsQueryResponse> requestLoanResponses = new List<GetLoanRequestsQueryResponse>();
            foreach (var request in requestPending)
            {
                var userOfRequest = await _userIdentityService.GetByIdIdentityUser(request.DataUser.Createby!);
                requestLoanResponses.Add(
                    new GetLoanRequestsQueryResponse(string.Concat(userOfRequest.Name, " ", userOfRequest.LastName),
                    (request.LotCost - request.DownPayment),
                    request.ID));
            }

            return requestLoanResponses;
        }

    }
}
