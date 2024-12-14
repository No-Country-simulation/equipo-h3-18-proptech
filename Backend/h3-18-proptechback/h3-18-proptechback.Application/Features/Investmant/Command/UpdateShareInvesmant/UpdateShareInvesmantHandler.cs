using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Features.Calculators;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using h3_18_proptechback.Application.Models.Emails;
using h3_18_proptechback.Application.Models.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static h3_18_proptechback.Application.Features.Calculators.InvestmantCalculator;

namespace h3_18_proptechback.Application.Features.Investmant.Command.UpdateShareInvesmant
{
    public class UpdateShareInvesmantHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinantialInvestmant _investmant;
        private readonly ILogger<UpdateShareInvesmantHandler> _logger;
        private readonly GetInvestmantUserQueryHandler _query;

        public UpdateShareInvesmantHandler(IUserIdentityService userIdentityService, IDataUserRepository dataUserRepository, 
            IFinantialInvestmant investmant, ILogger<UpdateShareInvesmantHandler> logger, GetInvestmantUserQueryHandler query)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
            _query = query;
            _logger = logger;
        }
        public async Task<string> UpdateShareInvestAsync(UpdateShareInvesmantCommand command, string email) 
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");
            
            //calc share
            var newemail = new GetInvestmantUserQueryRequest(user.Email);

            var getInvestmant = await _query.GetInvestmantByUserAsyc(newemail);

            var list = getInvestmant.Last();

            var moth = list.Moth++;
            var interest =  InvestmentInterest.interest;
            var calcular = new InvestmantCalculator(list.CaptialIntial, interest, moth);
            var interestmont = calcular.InterestPerMonth();
            var sharemont = command.Share + interestmont;
            var returninvest = sharemont + list.returnInvestmant;

            var invest = await _investmant.GetIdAsync(list.id);

            invest.LastModifiedBy = user.Id;
            invest.LastModifiedDate = DateTime.UtcNow;
            invest.year = DateTime.UtcNow.Year;
            invest.Moth = DateTime.UtcNow.Month;
            invest.MonthlyInterest = interestmont;
            invest.Share = command.Share;
            invest.profit = sharemont;
            invest.returnInvestmant = returninvest;

            var result = await _investmant.Update(invest);
            return $"Su cuota se a agregado exitosamente";
        }
    }
}
