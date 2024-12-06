using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.AllRequestLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.DetailLoanReq;
using h3_18_proptechback.Application.Models.Infrastructure;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.Loan.Queries
{
    public class LoanRequestQueryHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IUserIdentityService _userIdentityService;
        private readonly ILoanRepository _loanRepository;
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;
        private readonly ICreditRecordService _creditRecordService;

        public LoanRequestQueryHandler(ILoanRequestRepository loanRequestRepository, IUserIdentityService userIdentityService,
            ILoanRepository loanRepository, IDocumentsUserRepository documentsUserRepository,
            IDocumentsGuarantorRepository documentsGuarantorRepository, ICreditRecordService creditRecordService)
        {
            _loanRequestRepository = loanRequestRepository;
            _userIdentityService = userIdentityService;
            _loanRepository = loanRepository;
            _documentsUserRepository = documentsUserRepository;
            _documentsGuarantorRepository = documentsGuarantorRepository;
            _creditRecordService = creditRecordService;
        }

        public async Task<List<AllReqLoanQueryResponse>> GetAllRequestLoan()
        {
            var requestPending = await _loanRequestRepository.GetPendingLoanRequest();
            List<AllReqLoanQueryResponse> requestLoanResponses = new List<AllReqLoanQueryResponse>();
            foreach(var request in requestPending)
            {
                var userOfRequest = await _userIdentityService.GetByIdIdentityUser(request.DataUser.Createby!);
                requestLoanResponses.Add(
                    new AllReqLoanQueryResponse(string.Concat(userOfRequest.Name, " ", userOfRequest.LastName),
                    (request.LotCost - request.DownPayment),
                    request.ID));
            }

            return requestLoanResponses;
        }

        public async Task<List<AllLoanQueryResponse>> GetAllLoan(AllLoanQuery query)
        {
            var loans = await _loanRepository.GetAllLoanIncludeQuotas(query.StateLoan);

            List<AllLoanQueryResponse> list = new List<AllLoanQueryResponse>();
            foreach(var loan in loans)
            {
                var user = await _userIdentityService.GetByIdIdentityUser(loan.LoanRequest.DataUser.Createby!);
                var lateQuotas = loan.Quotas.Where(l => l.State == Domain.Common.StateQuota.Late).Count();
                list.Add(new AllLoanQueryResponse(loan.ID, lateQuotas, loan.StateLoan, string.Concat(user.Name, " ", user.LastName)));
            }

            if(!string.IsNullOrEmpty(query.Name))
                list = list.Where(d=>d.FullName.Contains(query.Name, StringComparison.OrdinalIgnoreCase)).ToList();

            return list;
        }
        public async Task<DetailLoanReqQueryResponse> GetDetailsLoanRequest(Guid loanRequestId)
        {
            var userInfo = await _documentsUserRepository.GetDocumentsIncludeDataByLoanRequestId(loanRequestId);
            var identityInfo = await _userIdentityService.GetByIdIdentityUser(userInfo.Createby);
            var loanRequest = await _loanRequestRepository.GetIdAsync(loanRequestId);
            var guarantorsInfo = await _documentsGuarantorRepository.GetDocIncludeDataGuaByLoanRequestId(loanRequestId);
            var guarantor1 = guarantorsInfo[0];
            var guarantor2 = guarantorsInfo[1];
            return new DetailLoanReqQueryResponse(identityInfo.Name, identityInfo.LastName, userInfo.DataUser.DNI
                , userInfo.DataUser.CUIT, identityInfo.Email, identityInfo.PhoneNumber,
                await GetCreditScore(userInfo.DataUser.CUIT), userInfo.SalaryURL, userInfo.Salary2URL, userInfo.Salary3URL,
                userInfo.ProofAddressURL, loanRequest.LotCost, loanRequest.DownPayment, loanRequest.QuotasCount,
                await CreateGuarantor(guarantor1), await CreateGuarantor(guarantor2));
        }

        public async Task<DetailLoanReqGuaQueryResponse> CreateGuarantor(DocumentsGuarantor guarantor1)
        {
            return new DetailLoanReqGuaQueryResponse(
                        guarantor1.DataGuarantor.FirstName, guarantor1.DataGuarantor.LastName, guarantor1.DataGuarantor.DNI,
                        guarantor1.DataGuarantor.CUIT, guarantor1.DataGuarantor.Email, guarantor1.DataGuarantor.PhoneNumber,
                        await GetCreditScore(guarantor1.DataGuarantor.CUIT), guarantor1.SalaryURL, guarantor1.Salary2URL,
                        guarantor1.Salary3URL, guarantor1.ProofAddressURL, guarantor1.PhotoURL, guarantor1.FrontDNIURL, guarantor1.BackDNIURL);
        }

        public async Task<int> GetCreditScore(string CUIT)
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
