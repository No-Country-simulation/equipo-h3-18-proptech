using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Application.Features.Loan.Queries.MyAllLoan;

namespace h3_18_proptechback.Application.Features.Loan.Queries.GetMyLoans
{
    public class GetMyLoansQueryHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly ILoanRepository _loanRepository;
        private FinancingCalculator _calculator;
        public GetMyLoansQueryHandler(IUserIdentityService userIdentityService, ILoanRepository loanRepository)
        {
            _userIdentityService = userIdentityService;
            _loanRepository = loanRepository;
        }
        public async Task<List<GetMyLoansQueryResponse>> GetMyAllLoan(string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var loans = await _loanRepository.GetMyAllLoanIncludeQuotas(user.Id);
            List<GetMyLoansQueryResponse> list = new List<GetMyLoansQueryResponse>();
            foreach (var loan in loans)
            {
                _calculator = new FinancingCalculator(loan.LoanRequest.LotCost, loan.LoanRequest.DownPayment, loan.LoanRequest.QuotasCount);
                decimal payedAtDay = loan.Quotas.Where(q => q.State == Domain.Common.StateQuota.Paid)
                                                                        .Sum(d => d.Amount);
                var remainingAmount = loan.TotalPayment - payedAtDay;
                var payedPercentage = Math.Round((payedAtDay * 100) / loan.TotalPayment, 2);
                var nextExpiredDate = loan.Quotas.OrderBy(q => q.QuotaNumber)
                                                    .First(d => d.State == Domain.Common.StateQuota.Pending)
                                                    .PayDate;
                var currentQuota = loan.Quotas.OrderBy(q => q.QuotaNumber)
                                               .First(q => q.PayDate > DateTime.Now.ToUniversalTime())
                                               .QuotaNumber;

                var paymentQuota = loan.Quotas.First().Amount;
                list.Add(new GetMyLoansQueryResponse(loan.ID, nextExpiredDate, remainingAmount, payedPercentage, loan.StateLoan, $"{currentQuota}/{loan.Quotas.Count}", paymentQuota, _calculator.GetList()));
            }
            return list;
        }
    }
}
