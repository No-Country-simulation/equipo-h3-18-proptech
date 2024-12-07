using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Application.Contracts.Persistence.Quota;
using h3_18_proptechback.Application.Features.WebHook.Commands.ApproveCuotaPayment;

namespace h3_18_proptechback.Application.Features.WebHook.Commands.PayQuota
{
    public class PayQuotaCommandHandler
    {
        private readonly IMercadoPagoService _mercadoPagoService;
        private readonly IQuotaRepository _quotaRepository;
        public PayQuotaCommandHandler(IMercadoPagoService mercadoPagoService, IQuotaRepository quotaRepository)
        {
            _mercadoPagoService = mercadoPagoService;
            _quotaRepository = quotaRepository;
        }

        public async Task HandleAsync(PayQuotaCommand command)
        {
            Guid? idQuota = await _mercadoPagoService.GetIdQuota(command.Data.Id);
            if (idQuota is null)
                return;
            var quota = await _quotaRepository.GetIdAsync(idQuota.Value);
            quota.State = Domain.Common.StateQuota.Paid;
            await _quotaRepository.Update(quota);
        }
    }
}
