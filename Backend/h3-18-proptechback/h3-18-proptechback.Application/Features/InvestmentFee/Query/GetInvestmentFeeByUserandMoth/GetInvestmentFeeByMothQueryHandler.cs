using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.InvestmentFee.Query.GetInvestmentFeeByUserandMoth
{
    public class GetInvestmentFeeByMothQueryHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinatialInvestmentFee _investmentFee;

        public GetInvestmentFeeByMothQueryHandler(IUserIdentityService userIdentityService, 
            IDataUserRepository dataUserRepository,
            IFinatialInvestmentFee investmentFee)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmentFee = investmentFee;
        }


        public async Task<List<GetInvestmentFeeByMothQueryResponse>> GetInvestmentFeebymontAsync(GetInvestmentFeeByMothQueryRequest query) 
        {
            var user = await _userIdentityService.GetIdentityUser(query.email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");
            
           var fee =  await _investmentFee.Getpermonth(query.InvestmantId);

            if (fee == null)
                throw new ArgumentException("No existe una inversion con ese numero");
            
            var responseList = new List<GetInvestmentFeeByMothQueryResponse>();

            foreach (var item in fee)
            {
                var response = new GetInvestmentFeeByMothQueryResponse
                { 
                    id = item.ID,
                    InvestmantId = item.InvestmantId,
                    IntialCapital = item.IntialCapital,
                    DateInitShare   = item.DateInitShare,
                    DateCloseShare = item.DateCloseShare,
                    Moth  = item.Moth,
                    year = item.year,
                    MonthlyInterest = item.MonthlyInterest,
                    Share = item.Share,
                    capitalization = item.capitalization
                };
                responseList.Add(response);
            }
            return responseList;
        }
    }
}
