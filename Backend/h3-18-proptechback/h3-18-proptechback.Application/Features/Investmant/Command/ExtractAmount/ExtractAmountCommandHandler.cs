using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;

namespace h3_18_proptechback.Application.Features.Investmant.Command.ExtractAmount
{
    public class ExtractAmountCommandHandler
    {
        private readonly IFinantialInvestmant _finantialInvestmant;
        private readonly IUserIdentityService _userIdentityService;
        public ExtractAmountCommandHandler(IFinantialInvestmant finantialInvestmant, IUserIdentityService userIdentityService)
        {
            _finantialInvestmant = finantialInvestmant;
            _userIdentityService = userIdentityService;
        }

        public async Task HandleAsync(ExtractAmountCommand command, string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);

            var investment = await _finantialInvestmant.InvestmentActiveByUserId(user.Id);
            if (investment is null)
                throw new ArgumentException("No cuenta con ninguna inversión activa.");

            if (command.Amount > investment.CurrentAmount)
                throw new ArgumentException("El monto a retirar no puede exceder el monto actual.");

            investment.CurrentAmount -= command.Amount;
            if (investment.CurrentAmount == 0)
            {
                investment.IsActive = false;
                investment.IsPayed = true;
                investment.DatePayment = DateTime.UtcNow;
            }

            investment.LastModifiedDate = DateTime.UtcNow;

            var investmentUpdated = await _finantialInvestmant.Update(investment);
        }
    }
}
