using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;
using h3_18_proptechback.Application.Features.Calculators;
using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using h3_18_proptechback.Application.Models.Emails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static h3_18_proptechback.Application.Features.Calculators.InvestmantCalculator;

namespace h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee
{
    public class AddInvestmentFeeCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinatialInvestmentFee _investmantFee;
        private readonly IFinantialInvestmant _investmant;
        

        public AddInvestmentFeeCommandHandler(IUserIdentityService userIdentityService, 
            IDataUserRepository dataUserRepository, IFinatialInvestmentFee investmentFee, IFinantialInvestmant investmant)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
            _investmantFee = investmentFee;
        }
        public async Task<string> AddInvestmantFeeAsync(AddInvestmentFeeCommand command, string email ) 
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

           //var investmantheat = await _investmant.GetIdAsync(command.InvestmantId);
            //if (investmantheat == null)
            //    throw new ArgumentException($"Este numero de inversion {command.InvestmantId} no se encuentra registrada por favor verfique");
            
            
            //var interest = InvestmentInterest.interest;
            //var moth = command.Moth;
            //var initial = command.IntialCapital;

            //var calcular = new InvestmantCalculator(initial, interest, moth);

            //var interestMonth = calcular.InterestPerMonth();

            

            var investmantFee = new Domain.InvestmentFee
            {
                //InvestmantId = investmantheat.ID,
                Createby = user.Id,
                CreatedDate= DateTime.Now.ToUniversalTime(),
                //DateInitShare = command.DateInitShare,
                //DateCloseShare = command.DateCloseShare,
                //Moth = command.Moth,
                //year = command.year,
                //MonthlyInterest = interestMonth,
                //Share = command.Share,
                //capitalization = command.Share + interestMonth

            };

            return $"Se ha realizado un abono a su inversion con lo siguientes Datos {investmantFee}";
        }
    }
}
