using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetDetailsRequestValidation;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries.DetailReqIdentity
{
    public class DetailReqIdentityQueryHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDocumentsUserRepository _documentsUserRepository;
        public DetailReqIdentityQueryHandler(IDataUserRepository dataUserRepository, IUserIdentityService userIdentityService,
            IDocumentsUserRepository documentsUserRepository)
        {
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
            _documentsUserRepository = documentsUserRepository;
        }
        public async Task<DetailReqIdentityQueryResponse> HandleAsync(string DNI)
        {
            var dataUser = await _dataUserRepository.GetByDNI(DNI);
            if (dataUser is null)
                throw new ArgumentException($"Solicitud en estado pendiente con DNI: {DNI} inexistente.");
            var user = await _userIdentityService.GetByIdIdentityUser(dataUser.Createby);
            var docsUser = await _documentsUserRepository.GetLastDataUser(DNI);

            var response = new DetailReqIdentityQueryResponse(user.Name, user.LastName, user.Email, user.PhoneNumber, dataUser.DNI, dataUser.CUIT, docsUser.PhotoURL, docsUser.FrontDNIURL, docsUser.BackDNIURL);
            return response;
        }
    }
}
