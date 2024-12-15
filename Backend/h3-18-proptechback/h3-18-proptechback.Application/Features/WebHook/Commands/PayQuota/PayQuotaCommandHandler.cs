using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Application.Contracts.Persistence.Quota;
using h3_18_proptechback.Application.Features.WebHook.Commands.ApproveCuotaPayment;

namespace h3_18_proptechback.Application.Features.WebHook.Commands.PayQuota
{
    public class PayQuotaCommandHandler
    {
        private readonly IMercadoPagoService _mercadoPagoService;
        private readonly IQuotaRepository _quotaRepository;
        private readonly ILoanRepository _loanRepository;
        private readonly IEmailServices _emailServices;
        private readonly IUserIdentityService _userIdentityService;
        public PayQuotaCommandHandler(IMercadoPagoService mercadoPagoService, IQuotaRepository quotaRepository,
            ILoanRepository loanRepository, IEmailServices emailServices, IUserIdentityService userIdentityService)
        {
            _mercadoPagoService = mercadoPagoService;
            _quotaRepository = quotaRepository;
            _loanRepository = loanRepository;
            _emailServices = emailServices;
            _userIdentityService = userIdentityService;
        }

        public async Task HandleAsync(PayQuotaCommand command)
        {
            Guid? idQuota = await _mercadoPagoService.GetIdQuota(command.Data.Id);
            if (idQuota is null)
                return;

            var quota = await _quotaRepository.GetIdAsync(idQuota.Value);
            var loan = await _loanRepository.GetIdAsync(quota.LoanId);

            var user = await _userIdentityService.GetByIdIdentityUser(quota.Createby);
            if (quota is null || loan is null)
                return;
            quota.State = Domain.Common.StateQuota.Paid;

            var quotaUpdated = await _quotaRepository.Update(quota);

            await _emailServices.SendEmailAsync(new Models.Emails.Email
            {
                TO = user.Email,
                Subject = $"Hemos recibido tu pago correspondiente a la cuota número {quotaUpdated.QuotaNumber}",
                BodyHTML = CreateBodyHtml(string.Concat(user.Name, " ", user.LastName), quotaUpdated.Amount, quotaUpdated.QuotaNumber),
                Body = $"¡Gracias por tu pago!\r\n\r\nHola {string.Concat(user.Name, " ", user.LastName)},\r\n\r\nHemos recibido tu pago correspondiente a la cuota número {{quotaNumber}}.\r\n\r\nPrecio: ${quotaUpdated.Amount}  \r\nNúmero de Cuota: {quotaUpdated.QuotaNumber}\r\n\r\n© {DateTime.Now.ToUniversalTime().Year} Financia.al | Todos los derechos reservados\r\n"
            });
            
            if (await _quotaRepository.IsCurrentQuota(quotaUpdated) &&
                !await _loanRepository.AnyQuotaLate(quota.LoanId))
            {
                
                loan.StateLoan = Domain.Common.StateLoan.AtDay;
                await _loanRepository.Update(loan);
            }
            
        }

        private string CreateBodyHtml(string fullName, decimal price, int quotaNumber)
        {
            return @$"<!DOCTYPE html>
<html lang=""es"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Notificación de Pago</title>
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
        .card-content .payment-info {{
            margin-top: 20px;
            background-color: #f0f4f8;
            padding: 15px;
            border-radius: 6px;
        }}
        .card-content .payment-info p {{
            margin: 5px 0;
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
            <h2>¡Gracias por tu pago!</h2>
            <p>Hola <strong>{fullName}</strong>,</p>
            <p>Hemos recibido tu pago correspondiente a la cuota número <strong>{quotaNumber}</strong>.</p>
            <div class=""payment-info"">
                <p><strong>Precio:</strong> ${price}</p>
                <p><strong>Numero de Cuota:</strong> {quotaNumber}</p>
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
