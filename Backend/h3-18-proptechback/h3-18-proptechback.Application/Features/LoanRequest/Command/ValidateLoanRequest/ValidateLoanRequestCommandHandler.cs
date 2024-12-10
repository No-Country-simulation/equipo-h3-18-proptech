using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.ValidateLoanRequest
{
    public class ValidateLoanRequestCommandHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly ILoanRepository _loanRepository;
        private readonly IMercadoPagoService _mercadoPagoService;
        private readonly IDolarService _dolarService;
        private FinancingCalculator _calculator;
        public ValidateLoanRequestCommandHandler(ILoanRequestRepository loanRequestRepository, ILoanRepository loanRepository, IMercadoPagoService mercadoPagoService, IDolarService dolarService)
        {
            _loanRequestRepository = loanRequestRepository;
            _loanRepository = loanRepository;
            _mercadoPagoService = mercadoPagoService;
            _dolarService = dolarService;
        }

        public async Task<string> HandleAsync(ValidateLoanRequestCommand command)
        {

            var loanUpdated = await _loanRequestRepository.ValidatePendingLoanRequest(command.LoanRequestId);
            _calculator = new FinancingCalculator(loanUpdated.LotCost, loanUpdated.DownPayment, loanUpdated.QuotasCount);
            var loan = new Domain.Loan
            {
                ID = command.LoanRequestId,
                Createby = loanUpdated.Createby,
                FinancingAmount = _calculator.FinancingAmount,
                InterestRate = _calculator.InteresRate(),
                CreatedDate = DateTime.Now.ToUniversalTime(),
                TotalPayment = _calculator.TotalPayment(),
                PaymentMonth = _calculator.PaymentMonth(),
                LoanRequestId = loanUpdated.ID,
                StateLoan = Domain.Common.StateLoan.Pending,

            };
            List<Quota> quotas = new List<Quota>();
            DateTime? lastQuota = null;

            for (int i = 1; i <= loanUpdated.QuotasCount; i++)
            {
                Quota quota = new Quota
                {
                    Amount = loan.PaymentMonth,
                    Createby = loan.Createby,
                    LoanId = loan.ID,
                    QuotaNumber = i,
                    State = Domain.Common.StateQuota.Pending,
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                    PayDate = GetDatetimeQuota(lastQuota),
                };
                quota.PreferenceID = await _mercadoPagoService
                    .CreateAndGetPreferenceID($"Pago de cuota N°{quota.QuotaNumber}",
                    await _dolarService.GetValueInARS(loan.PaymentMonth), quota.CreatedDate.Value,
                    quota.ID.ToString().Replace("-", ""),
                    "https://equipo-h3-18-proptech-desarrollo.onrender.com/buyer",
                    quota.PayDate);
                lastQuota = quota.PayDate;
                quotas.Add(quota);
            }
            loan.Quotas = quotas;
            await _loanRepository.Add(loan);
            return "¡Solicitud de préstamo validada con exito!";
        }

        private DateTime GetDatetimeQuota(DateTime? lastQuotaDate)
        {
            if (lastQuotaDate is null)
            {
                var timeNow = DateTime.Now.ToUniversalTime();
                var currentMonth11Date = new DateTime(timeNow.Year, timeNow.Month, 11).AddMonths(1).ToUniversalTime();

                return currentMonth11Date;
            }
            else
            {
                return lastQuotaDate.Value.AddMonths(1);
            }

        }
    }
}
