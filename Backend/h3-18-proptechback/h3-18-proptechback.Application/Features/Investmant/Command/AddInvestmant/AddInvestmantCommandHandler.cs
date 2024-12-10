using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant
{
    public class AddInvestmantCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IFinantialInvestmant _investmant;

        public AddInvestmantCommandHandler(IUserIdentityService userIdentityService, IFinantialInvestmant investmant, IDataUserRepository dataUserRepository)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
        }

        public async Task<string> AddInvestAsyc(AddInvestmantCommand command, string email) 
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");
            //falta validar pago
            var Investmant = new Domain.Investmant
            {
                CaptialIntial = command.CaptialIntial,
                Dateinitial = DateTime.Now.ToUniversalTime(),
                Isactive = command.Isactive,
                CreatedDate = DateTime.Now.ToUniversalTime(),

            };

            var investmantadd = await _investmant.Add(Investmant);



            return $"Sr {user.Name} {user.LastName} Su inversion por el monto {investmantadd.CaptialIntial} fue procesada exitosamente";  

        }
    }
}
