using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Models.Emails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser
{
    public class GetInvestmantUserQueryHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinantialInvestmant _investmant;
        

        public GetInvestmantUserQueryHandler(IUserIdentityService userIdentityService, 
            IDataUserRepository dataUserRepository, IFinantialInvestmant investmant)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
        }

        public async Task<GetInvestmantUserQueryResponse?> HandleAsync(string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

            var activeInvestment = await _investmant.InvestmentListActiveByUserId(user.Id);

            if (activeInvestment is null)
                return null;
            var historyOrder = activeInvestment.InvestmentFees.OrderBy(i => i.CreatedDate);
            List<GetItemUserQueryResponse> list = new List<GetItemUserQueryResponse>();
            foreach(var monthInvest in historyOrder)
            {
                list.Add(new GetItemUserQueryResponse(monthInvest.CreatedDate!.Value.Year,
                    monthInvest.CreatedDate.Value.Month, monthInvest.Profit));
            }
            var response = new GetInvestmantUserQueryResponse(activeInvestment.CurrentAmount, activeInvestment.CreatedDate!.Value, activeInvestment.TotalProfit, list);

            return response;
        }
    }
}
