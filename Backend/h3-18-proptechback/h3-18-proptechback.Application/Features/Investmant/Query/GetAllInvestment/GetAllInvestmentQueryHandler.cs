using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;

namespace h3_18_proptechback.Application.Features.Investmant.Query.GetAllInvestment
{
    public class GetAllInvestmentQueryHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IFinantialInvestmant _finantialInvestmant;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinatialInvestmentFee _finantialInvestmantFee;
        public GetAllInvestmentQueryHandler(IUserIdentityService userIdentityService, IFinantialInvestmant finantialInvestmant,
            IDataUserRepository dataUserRepository, IFinatialInvestmentFee finantialInvestmantFee)
        {
            _userIdentityService = userIdentityService;
            _finantialInvestmant = finantialInvestmant;
            _dataUserRepository = dataUserRepository;
            _finantialInvestmantFee = finantialInvestmantFee;
        }
        public async Task<List<GetAllInvestmentQueryResponse>> HandleAsync()
        {
            var investments = _finantialInvestmant.GetAll().ToList();
            List<GetAllInvestmentQueryResponse> list = new List<GetAllInvestmentQueryResponse>();
            foreach(var investment in investments)
            {
                var dataUser = await _dataUserRepository.GetUserByGuidIdentity(investment.Createby!);
                var user = await _userIdentityService.GetByIdIdentityUser(dataUser.Createby);
                list.Add(new GetAllInvestmentQueryResponse
                    (string.Concat(user.Name, " ", user.LastName), investment.CaptialIntial, 1, dataUser.DNI));
            }
            return list;

        }
    }
}
