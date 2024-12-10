using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AllLoan
{
    public class GetLoansQueryHandler
    {
        private readonly ILoanRepository _loanRepository;
        private readonly IUserIdentityService _userIdentityService;
        public GetLoansQueryHandler(ILoanRepository loanRepository, IUserIdentityService userIdentityService)
        {
            _loanRepository = loanRepository;
            _userIdentityService = userIdentityService;
        }
        public async Task<List<GetLoansQueryResponse>> HandleAsync(GetLoansQuery query)
        {
            var loans = await _loanRepository.GetAllLoanIncludeQuotas(query.StateLoan);

            List<GetLoansQueryResponse> list = new List<GetLoansQueryResponse>();
            foreach (var loan in loans)
            {
                var user = await _userIdentityService.GetByIdIdentityUser(loan.LoanRequest.DataUser.Createby!);
                var lateQuotas = loan.Quotas.Where(l => l.State == Domain.Common.StateQuota.Late).Count();
                list.Add(new GetLoansQueryResponse(loan.ID, lateQuotas, loan.StateLoan, string.Concat(user.Name, " ", user.LastName)));
            }

            if (!string.IsNullOrEmpty(query.Name))
                list = list.Where(d => d.FullName.Contains(query.Name, StringComparison.OrdinalIgnoreCase)).ToList();

            return list;
        }
    }
}
