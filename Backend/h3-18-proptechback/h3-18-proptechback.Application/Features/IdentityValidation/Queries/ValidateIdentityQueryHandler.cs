using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetDetailsRequestValidation;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries
{
    public class ValidateIdentityQueryHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly IUserIdentityService _userIdentityService;

        public ValidateIdentityQueryHandler(IDataUserRepository dataUserRepository,
            IUserIdentityService userIdentityService,
            IDocumentsUserRepository documentsUserRepository)
        {
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
            _documentsUserRepository = documentsUserRepository;
        }

        public async Task<DetailReqLoanQueryResponse> GetDetailPendingRequest(string DNI)

        {
            var dataUser = await _dataUserRepository.GetPendingByDNI(DNI);
            if(dataUser is null)
                throw new ArgumentException($"Solicitud en estado pendiente con DNI: {DNI} inexistente.");
            var user = await _userIdentityService.GetByIdIdentityUser(dataUser.Createby);
            var docsUser = await _documentsUserRepository.GetLastDataUser(DNI);


            var response = new DetailReqLoanQueryResponse(user.Name, user.LastName, user.Email, user.PhoneNumber, dataUser.DNI, dataUser.CUIT, docsUser.PhotoURL, docsUser.FrontDNIURL, docsUser.BackDNIURL);
            return response;
        }
        public async Task<List<GetRequestValidationQueryResponse>> GetPendingRequest()
        {
            var dataUsers = _dataUserRepository.GetAll();
            var dataUserfilt = dataUsers.Where(d => d.StateValidation == Domain.Common.StateRequest.Pending)
                .OrderBy(d => d.CreatedDate)
                .ToList();
            List<GetRequestValidationQueryResponse> list = new List<GetRequestValidationQueryResponse>();
            foreach(var requestValidation in dataUserfilt)
            {
                var userOfDataUser = await _userIdentityService.GetByIdIdentityUser(requestValidation.Createby);
                list.Add(new GetRequestValidationQueryResponse
                {
                    DNI = requestValidation.DNI,
                    DateRequest = requestValidation.CreatedDate,
                    FullName = string.Concat(userOfDataUser.Name, " ", userOfDataUser.LastName),
                    Role = userOfDataUser.Role
                });
            }

            return list;
        }
    }
}
