using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.Quota;
using h3_18_proptechback.Application.Features.WebHook.Commands.ApproveCuotaPayment;

namespace h3_18_proptechback.Application.Features.WebHook.Commands.PayQuota
{
    public class PayQuotaCommandHandler
    {
        private readonly IMercadoPagoService _mercadoPagoService;
        private readonly IQuotaRepository _quotaRepository;
        private readonly ILoanRepository _loanRepository;
        public PayQuotaCommandHandler(IMercadoPagoService mercadoPagoService, IQuotaRepository quotaRepository, ILoanRepository loanRepository)
        {
            _mercadoPagoService = mercadoPagoService;
            _quotaRepository = quotaRepository;
            _loanRepository = loanRepository;
        }

        public async Task HandleAsync(PayQuotaCommand command)
        {
            Guid? idQuota = await _mercadoPagoService.GetIdQuota(command.Data.Id);
            if (idQuota is null)
                return;

            var quota = await _quotaRepository.GetIdAsync(idQuota.Value);
            var loan = await _loanRepository.GetIdAsync(quota.LoanId);
            if (quota is null || loan is null)
                return;
            quota.State = Domain.Common.StateQuota.Paid;

            var quotaUpdated = await _quotaRepository.Update(quota);

            if (await _quotaRepository.IsCurrentQuota(quotaUpdated) &&
                !await _loanRepository.AnyQuotaLate(quota.LoanId))
            {
                
                loan.StateLoan = Domain.Common.StateLoan.AtDay;
                await _loanRepository.Update(loan);
            }
            
        }
    }
}
