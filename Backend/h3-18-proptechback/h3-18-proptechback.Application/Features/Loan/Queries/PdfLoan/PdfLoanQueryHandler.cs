using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
namespace h3_18_proptechback.Application.Features.Loan.Queries.PdfLoan
{
    public class PdfLoanQueryHandler
    {
        private readonly ILoanRepository _loanRepository;
        private readonly IUserIdentityService _userIdentityService;
        public PdfLoanQueryHandler(ILoanRepository loanRepository, IUserIdentityService userIdentityService)
        {
            _loanRepository = loanRepository;
            _userIdentityService = userIdentityService;
        }

        public async Task<PdfLoanQueryResponse> HandleAsync(PdfLoanQuery query, string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var loan = await _loanRepository.GetLoanByIdInclude(query.LoanId);
            if (loan is null || user.Id != loan.Createby)
                throw new ArgumentException($"No tienes un préstamo con el ID:{query.LoanId}");
            var orderedQuotas = loan.Quotas.OrderBy(q => q.QuotaNumber);
            List<PdfQuotaQueryResponse> list = new List<PdfQuotaQueryResponse>();
            foreach(var quota in orderedQuotas)
            {
                list.Add(new PdfQuotaQueryResponse(quota.ID, $"{quota.QuotaNumber}/{loan.LoanRequest.QuotasCount}",
                    quota.PayDate, quota.State, quota.Amount));
            }
            PdfLoanQueryResponse response = new PdfLoanQueryResponse(user.Name, user.LastName, user.Email, user.PhoneNumber,
                    loan.StateLoan, loan.CreatedDate.Value, list, loan.ID);
            return response;
        }
    }
    
}
