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

        public async Task<List<GetInvestmantUserQueryResponse>> GetInvestmantByUserAsyc(GetInvestmantUserQueryRequest queryRequest)
        {
            var user = await _userIdentityService.GetIdentityUser(queryRequest.email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

            var investmentalbyuser = _investmant.GetAll();
            var res = investmentalbyuser.Where(x => x.Createby == user.Id).ToList();

            if (res.Count == 0)
                return new List<GetInvestmantUserQueryResponse>();

            var responseList = new List<GetInvestmantUserQueryResponse>();

            foreach (var item in res)
            {
                var response = new GetInvestmantUserQueryResponse
                {
                    id = item.ID,
                    CaptialIntial = item.CaptialIntial,
                    Dateinitial = item.Dateinitial,
                    Moth = item.Moth,
                    year = item.year,
                    Isactive = item.Isactive,
                    DatePaymant = item.DatePaymant,
                    IsPayed = item.IsPayed,
                    MonthlyInterest = item.MonthlyInterest,
                    Share = item.Share,
                    profit = item.profit,
                    returnInvestmant = item.returnInvestmant
                };

                responseList.Add(response);
            }

            return responseList;
        }
    }
}
