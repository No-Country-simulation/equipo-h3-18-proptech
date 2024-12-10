using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Features.Loan.Queries.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan
{
    public class ClientLoanQueryHandler
    {
        private readonly ILoanRepository _loanRepository;
        private readonly IUserIdentityService _userIdentityService;
        public ClientLoanQueryHandler(ILoanRepository loanRepository, IUserIdentityService userIdentityService)
        {
            _loanRepository = loanRepository;
            _userIdentityService = userIdentityService;
        }
        public async Task<ClientLoanQueryResponse> HandleAsync(DetailsLoanQuery query, string email)
        {
            var loan = await _loanRepository.GetLoanByIdInclude(query.LoanId);
            if (loan is null)
                throw new ArgumentException("Préstamo no encontrado");
            var currentUser = await _userIdentityService.GetIdentityUser(email);
            if (currentUser.Id != loan.LoanRequest.DataUser.Createby)
                throw new ArgumentException("Préstamo no encontrado");

            var resultPagination = PaginationHelper.Pagination(query, loan.Quotas.ToList());

            var listResponse = resultPagination.quotas.Select(q =>
            {
                return new ClientQuotaQueryResponse(q.ID, $"{q.QuotaNumber}/{resultPagination.totalItems}", q.PayDate, q.State, q.Amount, q.PreferenceID);
            }).ToList();

            return new ClientLoanQueryResponse(query.Page, resultPagination.totalPages, query.StateQuota, listResponse, loan.ID);
        }
    }
}
