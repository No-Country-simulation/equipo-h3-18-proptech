using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI;
using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Application.Features.CalculatorCredit;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.ValidateLoanRequest
{
    public class ValidateLoanRequestCommandHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly ILoanRepository _loanRepository;
        private readonly IMercadoPagoService _mercadoPagoService;
        private readonly IDolarService _dolarService;
        private readonly IEmailServices _emailServices;
        private readonly IUserIdentityService _userIdentityService; 
        private FinancingCalculator _calculator;
        public ValidateLoanRequestCommandHandler(ILoanRequestRepository loanRequestRepository, ILoanRepository loanRepository,
         IMercadoPagoService mercadoPagoService, IDolarService dolarService, IEmailServices emailServices, IUserIdentityService userIdentityService)
        {
            _loanRequestRepository = loanRequestRepository;
            _loanRepository = loanRepository;
            _mercadoPagoService = mercadoPagoService;
            _dolarService = dolarService;
            _emailServices = emailServices;
            _userIdentityService = userIdentityService;
        }

        public async Task<string> HandleAsync(ValidateLoanRequestCommand command)
        {

            var loanUpdated = await _loanRequestRepository.ValidatePendingLoanRequest(command.LoanRequestId);
            _calculator = new FinancingCalculator(loanUpdated.LotCost, loanUpdated.DownPayment, loanUpdated.QuotasCount);
            var loan = new Domain.Loan
            {
                ID = command.LoanRequestId,
                Createby = loanUpdated.Createby,
                FinancingAmount = _calculator.FinancingAmount,
                InterestRate = _calculator.InteresRate(),
                CreatedDate = DateTime.Now.ToUniversalTime(),
                TotalPayment = _calculator.TotalPayment(),
                PaymentMonth = _calculator.PaymentMonth(),
                LoanRequestId = loanUpdated.ID,
                StateLoan = Domain.Common.StateLoan.Pending,

            };
            var user = await _userIdentityService.GetByIdIdentityUser(loan.Createby);
            var task = _emailServices.SendEmailAsync(new Models.Emails.Email{
                TO = user.Email,
                Subject = "Financia.al - Solicitud de préstamo aprobada",
                BodyHTML = CreateBodyHtml(string.Concat(user.Name, " ", user.LastName), loanUpdated.ID.ToString(), loanUpdated.LotCost, loanUpdated.DownPayment, loanUpdated.QuotasCount),   
                Body = @$"¡Tu préstamo ha sido validado!

Hola {string.Concat(user.Name, " ", user.LastName)},

Nos complace informarte que tu préstamo con los siguientes detalles ha sido validado:

- ID de Solicitud de Préstamo: {loanUpdated.ID}
- Coste del Lote: ${loanUpdated.LotCost}
- Pago Inicial: ${loanUpdated.DownPayment}
- Cantidad de Cuotas: {loanUpdated.QuotasCount}

Puedes ver más detalles de tu préstamo haciendo clic en el siguiente enlace:
https://equipo-h3-18-proptech-desarrollo.onrender.com/login

© {DateTime.Now.ToUniversalTime().Year} Financia.al | Todos los derechos reservados
"
            });
            List<Quota> quotas = new List<Quota>();
            DateTime? lastQuota = null;

            for (int i = 1; i <= loanUpdated.QuotasCount; i++)
            {
                Quota quota = new Quota
                {
                    ID = Guid.NewGuid(),
                    Amount = loan.PaymentMonth,
                    Createby = loan.Createby,
                    LoanId = loan.ID,
                    QuotaNumber = i,
                    State = Domain.Common.StateQuota.Pending,
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                    PayDate = GetDatetimeQuota(lastQuota),
                };
                quota.PreferenceID = await _mercadoPagoService
                    .CreateAndGetPreferenceID($"Pago de cuota N°{quota.QuotaNumber}",
                    await _dolarService.GetValueInARS(loan.PaymentMonth), quota.CreatedDate.Value,
                    quota.ID.ToString().Replace("-", ""),
                    "https://equipo-h3-18-proptech-desarrollo.onrender.com/buyer",
                    quota.PayDate);
                lastQuota = quota.PayDate;
                quotas.Add(quota);
            }
            loan.Quotas = quotas;
            await task;
            await _loanRepository.Add(loan);
            return "¡Solicitud de préstamo validada con exito!";
        }

        private DateTime GetDatetimeQuota(DateTime? lastQuotaDate)
        {
            if (lastQuotaDate is null)
            {
                var timeNow = DateTime.Now.ToUniversalTime();
                var currentMonth11Date = new DateTime(timeNow.Year, timeNow.Month, 11).AddMonths(1).ToUniversalTime();

                return currentMonth11Date;
            }
            else
            {
                return lastQuotaDate.Value.AddMonths(1);
            }

        }

        private string CreateBodyHtml(string fullName, string idLoanRequest, decimal lotCost, decimal downPayment, int quotasCount)
{
    return @$"<!DOCTYPE html>
<html lang=""es"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Notificación de Préstamo Validado</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }}
        .email-container {{
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }}
        .header {{
            background-color: white;
            padding: 20px;
            text-align: center;
        }}
        .header img {{
            max-width: 130px;
        }}
        .card-content {{
            padding: 20px;
            color: #333;
        }}
        .card-content h2 {{
            color: #3d5a80;
            margin-bottom: 10px;
        }}
        .card-content p {{
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }}
        .card-content .loan-info {{
            margin-top: 20px;
            background-color: #f0f4f8;
            padding: 15px;
            border-radius: 6px;
        }}
        .card-content .loan-info p {{
            margin: 5px 0;
        }}
        .button-container {{
            margin-top: 20px;
            text-align: center;
        }}
        .button {{
            display: inline-block;
            padding: 10px 20px;
            background-color: #3d5a80;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
        }}
        .footer {{
            background-color: #3d5a80;
            color: white;
            padding: 10px;
            text-align: center;
        }}
    </style>
</head>
<body>

    <div class=""email-container"" style=""margin-top: 2em;"">
        <div class=""header"">
            <!-- Logo -->
            <img src=""https://res.cloudinary.com/dwqg0f5ak/image/upload/f_auto,q_auto/wzplcrfonetzagyrnusa"" alt=""""/>
        </div>

        <div class=""card-content"">
            <h2>¡Tu préstamo ha sido validado!</h2>
            <p>Hola <strong>{fullName}</strong>,</p>
            <p>Nos complace informarte que tu préstamo con los siguientes detalles ha sido validado:</p>
            <div class=""loan-info"">
                <p><strong>ID de Solicitud de Préstamo:</strong> {idLoanRequest}</p>
                <p><strong>Coste del Lote:</strong> ${lotCost}</p>
                <p><strong>Pago Inicial:</strong> ${downPayment}</p>
                <p><strong>Cantidad de Cuotas:</strong> {quotasCount}</p>
            </div>
            <div class=""button-container"">
                <a href=""https://equipo-h3-18-proptech-desarrollo.onrender.com/login"" class=""button"">Ver Préstamo</a>
            </div>
        </div>

        <div class=""footer"">
            <p>&copy; {DateTime.Now.ToUniversalTime().Year} Financia.al | Todos los derechos reservados</p>
        </div>
    </div>

</body>
</html>";
}

    }
}
