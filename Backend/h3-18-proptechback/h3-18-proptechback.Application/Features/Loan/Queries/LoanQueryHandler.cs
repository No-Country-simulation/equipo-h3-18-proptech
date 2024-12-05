using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries
{
    public class LoanQueryHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IUserIdentityService _userIdentityService;

        public LoanQueryHandler(ILoanRequestRepository loanRequestRepository, IUserIdentityService userIdentityService)
        {
            _loanRequestRepository = loanRequestRepository;
            _userIdentityService = userIdentityService;
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
    }
}
