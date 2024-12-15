using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.UpdateInvestmant
{
    public class UpdateInvestmantCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinantialInvestmant _investmant;

        public UpdateInvestmantCommandHandler(IUserIdentityService userIdentityService, IDataUserRepository dataUserRepository,
            IFinantialInvestmant investmant)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
        }

        public async Task<string> AddInvestAsyc(UpdateInvestmantCommand command, string email) 
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

            var Investmant = new Domain.Investmant
            {
                ID = command.Id,
                //CaptialIntial = command.CaptialIntial,
                //Dateinitial = DateTime.Now.ToUniversalTime(),
                //Isactive = command.Isactive,
                IsPayed = command.IsPayed,
                LastModifiedBy = user.Id,
                LastModifiedDate = DateTime.Now.ToUniversalTime(),
                //returnInvestmant = command.returnInvestmant

            };

            var investmantupdate = await _investmant.Update(Investmant);

            return $"Se realizaron las siguientes modificaciones{investmantupdate}";
        }
    }
}
