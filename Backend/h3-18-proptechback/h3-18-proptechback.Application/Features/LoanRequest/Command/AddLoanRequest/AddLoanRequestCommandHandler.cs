﻿using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.Cloudinary;
using h3_18_proptechback.Application.Contracts.Persistence.DataGuarantor;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.AddLoanRequest
{
    public class AddLoanRequestCommandHandler
    {
        private readonly IUserIdentityService _userIdentityService;
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IDataGuarantorRepository _dataGuarantorRepository;
        private readonly IDocumentsUserRepository _documentsUserRepository;
        private readonly IDocumentsGuarantorRepository _documentsGuarantorRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly ILoanRequestRepository _loanRequestRepository;

        public AddLoanRequestCommandHandler(IUserIdentityService userIdentityService, IDataUserRepository dataUserRepository,
            IDataGuarantorRepository dataGuarantorRepository, IDocumentsUserRepository documentsUserRepository,
            IDocumentsGuarantorRepository documentsGuarantorRepository, ICloudinaryService cloudinaryService,
            ILoanRequestRepository loanRequestRepository)
        {
            _userIdentityService = userIdentityService;
            _dataUserRepository = dataUserRepository;
            _dataGuarantorRepository = dataGuarantorRepository;
            _documentsUserRepository = documentsUserRepository;
            _documentsGuarantorRepository = documentsGuarantorRepository;
            _cloudinaryService = cloudinaryService;
            _loanRequestRepository = loanRequestRepository;
        }
        public async Task<string> HandleAsync(AddLoanRequestCommand command, string email)
        {
            var user = await _userIdentityService.GetIdentityUser(email);

            var dataUser = await _dataUserRepository.GetUserByGuidIdentity(user.Id);

            if (dataUser is null || dataUser.StateValidation is not Domain.Common.StateRequest.Valid)
                throw new ArgumentException("El usuario no tiene identidad validada.");

            if (command.Guarantor1.DNI == dataUser.DNI || command.Guarantor2.DNI == dataUser.DNI)
                throw new ArgumentException("El DNI de un garante no puede ser igual al del usuario.");

            if (command.Guarantor1.CUIT == dataUser.CUIT || command.Guarantor2.CUIT == dataUser.CUIT)
                throw new ArgumentException("El CUIT de un garante no puede ser igual al del usuario.");

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

            var loanRequest = new Domain.LoanRequest
            {
                DataUserId = dataUser.ID,
                Createby = user.Id,
                LotCost = command.LotCost,
                DownPayment = command.DownPayment,
                QuotasCount = command.QuotasCount,
                CreatedDate = DateTime.Now.ToUniversalTime(),
                StateRequest = Domain.Common.StateRequest.Pending,
                CBU = command.CBU
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
                lastDocUser.LoanRequestId = loanRequestCreated.ID;

                await _documentsUserRepository.Update(lastDocUser);
            }
            else
            {
                results = await Task.WhenAll(uploadTasks);

                if (results.Any(string.IsNullOrEmpty))
                    throw new Exception("Error externo al servidor.");

                var newDocUser = new Domain.DocumentsUser
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
            await CreateDocsGuarantor(user.Id, guarantor2ID, results.Skip(11).Take(7).ToArray());

            return "¡Solicitud de préstamo solicitada exitosamente! Un operador revisará su solicitud.";
        }

        private async Task<Guid> CreateDataGuarantor(AddLoanRequestGuaCommand command, string idUser, Guid idLoanRequest)
        {
            var dataGuarantorToCreate = new DataGuarantor
            {
                DNI = command.DNI,
                CUIT = command.DNI,
                FirstName = command.Name,
                LastName = command.LastName,
                Createby = idUser,
                LoanRequestId = idLoanRequest,
                CreatedDate = DateTime.Now.ToUniversalTime(),
                Email = command.Email,
                PhoneNumber = command.PhoneNumber
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
