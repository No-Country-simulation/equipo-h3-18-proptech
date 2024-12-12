using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Application.Features.Loan.Queries.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.AdminLoan
{
    public class AdminLoanQueryHandler
    {
        private readonly ILoanRepository _loanRepository;
        private FinancingCalculator _calculator;
        public AdminLoanQueryHandler(ILoanRepository loanRepository)
        {
            _loanRepository = loanRepository;
        }
        public async Task<AdminLoanQueryResponse> HandleAsync(DetailsLoanQuery query)
        {
            var loan = await _loanRepository.GetLoanByIdInclude(query.LoanId);
            if (loan is null)
                throw new ArgumentException("Préstamo no encontrado");

            _calculator = new FinancingCalculator(loan.LoanRequest.LotCost, loan.LoanRequest.DownPayment, loan.LoanRequest.QuotasCount);

            var resultPagination = PaginationHelper.Pagination(query, loan.Quotas.ToList());

            var listResponse = resultPagination.quotas.Select(q =>
            {
                return new QuotaQueryResponse(q.ID, $"{q.QuotaNumber}/{resultPagination.totalItems}", q.PayDate, q.State, q.Amount);
            }).ToList();

            return new AdminLoanQueryResponse(query.Page, resultPagination.totalPages, query.StateQuota, listResponse, loan.ID, _calculator.GetList());
        }
    }
}
