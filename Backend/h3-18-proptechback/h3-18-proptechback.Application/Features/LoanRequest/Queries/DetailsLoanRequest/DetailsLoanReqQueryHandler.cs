using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Models.Infrastructure;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.LoanRequest.Queries.DetailsLoanRequest
{
    public class DetailsLoanReqQueryHandler
    {
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly IUserIdentityService _userIdentityService; 
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;
        private readonly ICreditRecordService _creditRecordService;
        public DetailsLoanReqQueryHandler(IDocumentsUserRepository documentsUserRepository,
            IUserIdentityService userIdentityService, ILoanRequestRepository loanRequestRepository,
            IDocumentsGuarantorRepository documentsGuarantorRepository, ICreditRecordService creditRecordService)
        {
            _documentsUserRepository = documentsUserRepository;
            _userIdentityService = userIdentityService;
            _loanRequestRepository = loanRequestRepository;
            _documentsGuarantorRepository = documentsGuarantorRepository;
            _creditRecordService = creditRecordService;
        }
        public async Task<DetailsLoanReqQueryResponse> HandleAsync(Guid loanRequestId)
        {
            var userInfo = await _documentsUserRepository.GetDocumentsIncludeDataByLoanRequestId(loanRequestId);
            var identityInfo = await _userIdentityService.GetByIdIdentityUser(userInfo.Createby);
            var loanRequest = await _loanRequestRepository.GetIdAsync(loanRequestId);
            var guarantorsInfo = await _documentsGuarantorRepository.GetDocIncludeDataGuaByLoanRequestId(loanRequestId);
            var guarantor1 = guarantorsInfo[0];
            var guarantor2 = guarantorsInfo[1];
            return new DetailsLoanReqQueryResponse(identityInfo.Name, identityInfo.LastName, userInfo.DataUser.DNI
                , userInfo.DataUser.CUIT, identityInfo.Email, identityInfo.PhoneNumber,
                await GetCreditScore(userInfo.DataUser.CUIT), userInfo.SalaryURL, userInfo.Salary2URL, userInfo.Salary3URL,
                userInfo.ProofAddressURL, loanRequest.LotCost, loanRequest.DownPayment, loanRequest.QuotasCount,
                await CreateGuarantor(guarantor1), await CreateGuarantor(guarantor2));
        }

        private async Task<DetailLoanReqGuaQueryResponse> CreateGuarantor(DocumentsGuarantor guarantor1)
        {
            return new DetailLoanReqGuaQueryResponse(
                        guarantor1.DataGuarantor.FirstName, guarantor1.DataGuarantor.LastName, guarantor1.DataGuarantor.DNI,
                        guarantor1.DataGuarantor.CUIT, guarantor1.DataGuarantor.Email, guarantor1.DataGuarantor.PhoneNumber,
                        await GetCreditScore(guarantor1.DataGuarantor.CUIT), guarantor1.SalaryURL, guarantor1.Salary2URL,
                        guarantor1.Salary3URL, guarantor1.ProofAddressURL, guarantor1.PhotoURL, guarantor1.FrontDNIURL, guarantor1.BackDNIURL);
        }

        private async Task<int> GetCreditScore(string CUIT)
        {
            try
            {
                return await _creditRecordService.GetCreditScore(new DeudasRequest { identificacion = long.Parse(CUIT) });
            }
            catch
            {
                return 1;
            }
        }

    }
}
