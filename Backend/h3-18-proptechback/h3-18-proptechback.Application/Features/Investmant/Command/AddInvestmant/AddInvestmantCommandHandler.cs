using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
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
        private readonly IFinatialInvestmentFee _fee;
        private readonly GetInvestmantUserQueryHandler _query;
        
        public AddInvestmantCommandHandler(IUserIdentityService userIdentityService, IFinantialInvestmant investmant, 
                                        IDataUserRepository dataUserRepository, IFinatialInvestmentFee fee)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _investmant = investmant;
            _fee = fee;
           
        }

        public async Task<string> HandleAsync(AddInvestmantCommand command, string email) 
        {
            var user = await _userIdentityService.GetIdentityUser(email);
            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad valida.");

            var hasInvestment = await _investmant.InvestmentActiveByUserId(user.Id);
            Guid? guid = null;
            if(hasInvestment is null)
            {
                var newInvestment = new Domain.Investmant
                {
                    Createby = user.Id,
                    CreatedDate = DateTime.UtcNow,
                    CurrentAmount = command.Amount,
                    DatePayment = null,
                    IsActive = true,
                    IsPayed = false,
                    TotalProfit = 0,
                };

                var investmentAdded = await _investmant.Add(newInvestment);
                guid = investmentAdded.ID;
            }
            else
            {
                hasInvestment.CurrentAmount += command.Amount;
                hasInvestment.LastModifiedBy = user.Id;
                hasInvestment.LastModifiedDate = DateTime.UtcNow;
                var investmentUpdated = await _investmant.Update(hasInvestment);
                guid = investmentUpdated.ID;
            }
            return $"Sr {user.Name} {user.LastName} Su inversion por el monto {Math.Round(command.Amount, 2)} fue procesada exitosamente bajo el numero {guid}";

            //exist investmant
            //var newemail = new GetInvestmantUserQueryRequest(user.Email);

            //var getInvestmant = await _query.GetInvestmantByUserAsyc(newemail);

            //var list = getInvestmant.Last();

            //if(getInvestmant.Count == 0 ) { 


            //    var Investmant = new Domain.Investmant
            //    {
            //        CapitalInitial = command.CapitalInitial,
            //        IsActive = true,
            //        IsPayed = false,   
            //        Createby = user.Id,
            //        CreatedDate = DateTime.Now.ToUniversalTime(),

            //    };
            //    var investmantadd = await _investmant.Add(Investmant);
            //    var investmantFee = new Domain.InvestmentFee
            //    { 
            //        InvestmantId = Investmant.ID,
            //        Createby =user.Id,
            //        CreatedDate = DateTime.UtcNow.ToUniversalTime(),
            //        DateCloseShare = DateTime.UtcNow.ToUniversalTime(),
            //        Month = DateTime.Now.Month,


                
            //    };
            //    var investmantaddfee =  _fee.Add(investmantFee);

            //    return $"Sr  {user.Name} {user.LastName} Su inversion por el monto  fue procesada exitosamente bajo el numero {investmantadd.ID}";

            //}
            //else 
            //{
            //   var newinvestmant =  command.CapitalInitial + list.returnInvestmant;
            //    var Investmant = new Domain.Investmant
            //    {
            //        CapitalInitial = command.CapitalInitial,
            //        IsActive = true,
            //        IsPayed = false,
            //        Createby = user.Id,
            //        CreatedDate = DateTime.Now.ToUniversalTime(),
            //        ReturnInvestment = newinvestmant
                    
            //    };
            //    var investmantadd = _investmant.Update(Investmant);
            //    var investmantFee = new Domain.InvestmentFee
            //    {
            //        InvestmantId = Investmant.ID,
            //        Createby = user.Id,
            //        CreatedDate = DateTime.UtcNow.ToUniversalTime(),
            //        DateCloseShare = DateTime.UtcNow.ToUniversalTime(),
            //        Month = DateTime.Now.Month,



            //    };
            //    var investmantaddfee = _fee.Add(investmantFee);
            //    return $"Sr  {user.Name} {user.LastName} Su inversion por el monto  fue procesada exitosamente bajo el numero {investmantadd.Id}";
            //}

            

        }
    }
}
