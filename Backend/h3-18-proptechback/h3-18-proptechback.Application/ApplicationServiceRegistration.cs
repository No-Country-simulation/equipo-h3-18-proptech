﻿using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser;
using h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser;
using h3_18_proptechback.Application.Features.DocumentsUser.Command.AddDocumentsUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.RejectUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;
using h3_18_proptechback.Application.Features.LoanRequest.Command.AddLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Command.RejectLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Command.ValidateLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Queries.DetailsLoanRequest;
using h3_18_proptechback.Application.Features.LoanRequest.Queries.GetLoanRequests;
using h3_18_proptechback.Application.Features.Loan.Queries.AdminLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.AllLoan;
using h3_18_proptechback.Application.Features.Loan.Queries.GetMyLoans;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddUser;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.DetailReqIdentity;
using h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation;
using h3_18_proptechback.Application.Features.WebHook.Commands.PayQuota;
using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser;
using h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee;
using h3_18_proptechback.Application.Features.Investmant.Command.UpdateInvestmant;
using h3_18_proptechback.Application.Features.InvestmentFee.Query.GetInvestmentFeeByUserandMoth;
using h3_18_proptechback.Application.Features.Investmant.Command.UpdateShareInvesmant;
using h3_18_proptechback.Application.Features.Investmant.Query.GetAllInvestment;
using h3_18_proptechback.Application.Features.Loan.Queries.PdfLoan;
using h3_18_proptechback.Application.Features.Investmant.Command.ExtractAmount;


namespace h3_18_proptechback.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddAplicationService(this IServiceCollection service)
        {
            //DataUser
            //---------------
            service.AddScoped<AddUserCommandHandler>();
            service.AddScoped<UpdateUserCommandHandler>();
            service.AddScoped<GetCurrentUserQueryHandler>();

            //IdentityValidation
            //---------------
            service.AddScoped<RejectUserCommandHandler>();
            service.AddScoped<ValidateUserCommandHandler>();
            service.AddScoped<DetailReqIdentityQueryHandler>();
            service.AddScoped<GetRequestValidationQueryHandler>();

            //DocumentsUser
            //---------------
            service.AddScoped<AddDocumentsUserCommandHandler>();

            //LoanRequest
            //---------------
            service.AddScoped<AddLoanRequestCommandHandler>();
            service.AddScoped<RejectLoanRequestCommandHandler>();
            service.AddScoped<ValidateLoanRequestCommandHandler>();
            service.AddScoped<DetailsLoanReqQueryHandler>();
            service.AddScoped<GetLoanRequestsQueryHandler>();

            //Loan
            //---------------
            service.AddScoped<AdminLoanQueryHandler>();
            service.AddScoped<ClientLoanQueryHandler>();
            service.AddScoped<GetLoansQueryHandler>();
            service.AddScoped<GetMyLoansQueryHandler>();
            service.AddScoped<PdfLoanQueryHandler>();
            //Investmant
            //---------------
            service.AddScoped<AddInvestmantCommandHandler>();
            service.AddScoped<ExtractAmountCommandHandler>();
            service.AddScoped<GetInvestmantUserQueryHandler>();
            service.AddScoped<UpdateInvestmantCommandHandler>();
            //service.AddScoped<UpdateShareInvesmantHandler>();

            //InvestmantFee
            //-------------------
            service.AddScoped<AddInvestmentFeeCommandHandler>();
            service.AddScoped<GetInvestmentFeeByMothQueryHandler>();
            service.AddScoped<GetAllInvestmentQueryHandler>();

            service.AddScoped<PayQuotaCommandHandler>();

            service.AddFluentValidationAutoValidation();
            service.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            return service;

        }
    }
}