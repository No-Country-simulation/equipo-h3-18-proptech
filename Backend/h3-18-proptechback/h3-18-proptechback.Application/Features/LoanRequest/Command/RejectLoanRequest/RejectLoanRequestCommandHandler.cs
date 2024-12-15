using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.RejectLoanRequest
{
    public class RejectLoanRequestCommandHandler
    {
        private readonly ILoanRequestRepository _loanRequestRepository;
        private readonly IEmailServices _emailServices;
        private readonly IUserIdentityService _userIdentityService;
        public RejectLoanRequestCommandHandler(ILoanRequestRepository loanRequestRepository, IEmailServices emailServices, IUserIdentityService userIdentityService)
        {
            _loanRequestRepository = loanRequestRepository;
            _emailServices = emailServices;
            _userIdentityService = userIdentityService;
        }
        public async Task<string> HandleAsync(RejectLoanRequestCommand command)
        {
            var loanUpdated = await _loanRequestRepository.RejectPendingLoanRequest(command.LoanRequestId);
            var user = await _userIdentityService.GetByIdIdentityUser(loanUpdated.Createby);
            await _emailServices.SendEmailAsync(new Models.Emails.Email {
                TO = user.Email,
                Subject = "Financia.al - Solicitud de préstamo rechazada",
                BodyHTML = CreateRejectionBodyHtml(string.Concat(user.Name, " ", user.LastName), loanUpdated.ID.ToString(), loanUpdated.LotCost, loanUpdated.DownPayment, loanUpdated.QuotasCount),
                Body = CreateRejectionPlainText(string.Concat(user.Name, " ", user.LastName), loanUpdated.ID.ToString()),
            });
            return "¡Solicitud de préstamo rechazada con exito!";
        }

        private string CreateRejectionPlainText(string fullName, string idLoanRequest)
{
    return @$"Lo sentimos, tu solicitud fue rechazada

Hola {fullName},

Lamentamos informarte que tu solicitud de préstamo con el ID {idLoanRequest} no ha sido aprobada.

Si deseas más información sobre el motivo del rechazo o deseas realizar una nueva solicitud, por favor contáctanos.

© {DateTime.Now.ToUniversalTime().Year} Financia.al | Todos los derechos reservados";
}

        private string CreateRejectionBodyHtml(string fullName, string idLoanRequest, decimal lotCost, decimal downPayment, int quotasCount)
{
    return @$"<!DOCTYPE html>
<html lang=""es"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Notificación de Solicitud Rechazada</title>
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
            color: #d9534f;
            margin-bottom: 10px;
        }}
        .card-content p {{
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
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
            <h2>Lo sentimos, tu solicitud fue rechazada</h2>
            <p>Hola <strong>{fullName}</strong>,</p>
            <p>Lamentamos informarte que tu solicitud de préstamo con el ID <strong>{idLoanRequest}</strong> no ha sido aprobada.</p>
            <p>Si deseas más información sobre el motivo del rechazo o deseas realizar una nueva solicitud, por favor contáctanos.</p>
            <p><strong>Coste del Lote:</strong> ${lotCost}</p>
            <p><strong>Pago Inicial:</strong> ${downPayment}</p>
            <p><strong>Cantidad de Cuotas:</strong> {quotasCount}</p>
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
