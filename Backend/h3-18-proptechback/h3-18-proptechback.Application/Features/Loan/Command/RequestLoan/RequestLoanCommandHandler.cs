using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence.DataGuarantor;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.Loan.Command.RequestLoan
{
    public class RequestLoanCommandHandler
    {
        private readonly ICloudinaryService _cloudinaryService;
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly IDataGuarantorRepository _dataGuarantorRepository;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;

        public RequestLoanCommandHandler(ICloudinaryService cloudinaryService, ILoanRequestRepository loanRequestRepository,
            IDataUserRepository dataUserRepository, IUserIdentityService userIdentityService, IDocumentsUserRepository documentsUserRepository,
            IDataGuarantorRepository dataGuarantorRepository,
            IDocumentsGuarantorRepository documentsGuarantorRepository)
        {
            _cloudinaryService = cloudinaryService;
            _loanRequestRepository = loanRequestRepository;
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
            _documentsUserRepository = documentsUserRepository;
            _dataGuarantorRepository = dataGuarantorRepository;
            _documentsGuarantorRepository = documentsGuarantorRepository;
        }

        public async Task<string> SendLoanRequest(RequestLoanCommand command, string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);

            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if(dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

            var lastDocUser = await _documentsUserRepository.GetLastDataUser(dataUser.DNI);

            var uploadTasks = new Task<string?>[]
                {
                    _cloudinaryService.UploadMedia(command.Salary), //0
                    _cloudinaryService.UploadMedia(command.Salary2), //1
                    _cloudinaryService.UploadMedia(command.Salary3), //2
                    _cloudinaryService.UploadMedia(command.ProofOfAddress), //3----------------
                    _cloudinaryService.UploadMedia(command.Guarantor1.Front), //4
                    _cloudinaryService.UploadMedia(command.Guarantor1.Back), //5
                    _cloudinaryService.UploadMedia(command.Guarantor1.Photo), //6
                    _cloudinaryService.UploadMedia(command.Guarantor1.Salary), //7
                    _cloudinaryService.UploadMedia(command.Guarantor1.Salary2), //8
                    _cloudinaryService.UploadMedia(command.Guarantor1.Salary3), //9
                    _cloudinaryService.UploadMedia(command.Guarantor1.ProofOfAddress), //10-----------
                    _cloudinaryService.UploadMedia(command.Guarantor2.Front), //11
                    _cloudinaryService.UploadMedia(command.Guarantor2.Back), //12
                    _cloudinaryService.UploadMedia(command.Guarantor2.Photo), //13
                    _cloudinaryService.UploadMedia(command.Guarantor2.Salary), //14
                    _cloudinaryService.UploadMedia(command.Guarantor2.Salary2), //15
                    _cloudinaryService.UploadMedia(command.Guarantor2.Salary3), //16
                    _cloudinaryService.UploadMedia(command.Guarantor2.ProofOfAddress) //17
                };

            var loanRequest = new LoanRequest
            {
                DataUserId = dataUser.ID,
                Createby = user.Id,
                LotCost = command.LotCost,
                DownPayment = command.DownPayment,
                QuotasCount = command.QuotasCount,
                CreatedDate = DateTime.Now.ToUniversalTime(),
                StateRequest = Domain.Common.StateRequest.Pending,
            };

            string[] results;

            var loanRequestCreated = await _loanRequestRepository.Add(loanRequest);

            if (string.IsNullOrEmpty(lastDocUser.SalaryURL) || string.IsNullOrEmpty(lastDocUser.Salary2URL) || string.IsNullOrEmpty(lastDocUser.Salary3URL) || string.IsNullOrEmpty(lastDocUser.ProofAddressURL))
            {
                

                results = await Task.WhenAll(uploadTasks);

                if (results.Any(string.IsNullOrEmpty))
                    throw new Exception("Error externo al servidor.");

                lastDocUser.SalaryURL = results[0];
                lastDocUser.Salary2URL = results[1];
                lastDocUser.Salary3URL = results[2];
                lastDocUser.ProofAddressURL = results[3];

                await _documentsUserRepository.Update(lastDocUser);
            }
            else
            {
                results = await Task.WhenAll(uploadTasks);

                if (results.Any(string.IsNullOrEmpty))
                    throw new Exception("Error externo al servidor.");

                var newDocUser = new DocumentsUser
                {
                    FrontDNIURL = lastDocUser.FrontDNIURL,
                    BackDNIURL = lastDocUser.BackDNIURL,
                    PhotoURL = lastDocUser.PhotoURL,
                    SalaryURL = results[0],
                    Salary2URL = results[1],
                    Salary3URL = results[2],
                    ProofAddressURL = results[3],
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                    Createby = user.Id,
                    DataUserID = lastDocUser.DataUserID,
                    LoanRequestId = loanRequestCreated.ID,
                };

                var docUserCreated = await _documentsUserRepository.Add(newDocUser);  
            }

            var guarantor1ID = await CreateDataGuarantor(command.Guarantor1, user.Id, loanRequestCreated.ID);
            var guarantor2ID = await CreateDataGuarantor(command.Guarantor2, user.Id, loanRequestCreated.ID);

            await CreateDocsGuarantor(user.Id, guarantor1ID, results.Skip(4).Take(7).ToArray());
            await CreateDocsGuarantor(user.Id, guarantor1ID, results.Skip(11).Take(7).ToArray());

            return "¡Solicitud de préstamo solicitada exitosamente! Un operador revisará su solicitud.";
        }

        private async Task<Guid> CreateDataGuarantor(RequestLoanGuarantorCommand command, string idUser, Guid idLoanRequest)
        {
            var dataGuarantorToCreate = new DataGuarantor
            {
                DNI = command.DNI,
                CUIT = command.DNI,
                FirstName = command.Name,
                LastName = command.LastName,
                Createby = idUser,
                LoanRequestId = idLoanRequest,
                CreatedDate = DateTime.Now.ToUniversalTime()
            };
            var dataResponse = await _dataGuarantorRepository.Add(dataGuarantorToCreate);
            return dataResponse.ID;
        }

        private async Task CreateDocsGuarantor(string idUser, Guid idDataGuarantor, params string[] urls)
        {
            var docGuarantorToCreate = new DocumentsGuarantor
            {
                DataGuarantorID = idDataGuarantor,
                Createby = idUser,
                FrontDNIURL = urls[0],
                BackDNIURL = urls[1],
                PhotoURL = urls[2],
                SalaryURL = urls[3],
                Salary2URL = urls[4],
                Salary3URL = urls[5],
                ProofAddressURL = urls[6],
                CreatedDate = DateTime.Now.ToUniversalTime()
            };
            await _documentsGuarantorRepository.Add(docGuarantorToCreate);
            
        }
    }
}
