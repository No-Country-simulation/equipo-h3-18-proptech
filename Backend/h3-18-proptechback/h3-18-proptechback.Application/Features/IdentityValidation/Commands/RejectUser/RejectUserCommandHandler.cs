using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.RejectUser
{
    public class RejectUserCommandHandler
    {
        private readonly IDataUserRepository _dataUserRepository;
        private readonly IUserIdentityService _userIdentityService;
        private readonly IEmailServices _emailServices;
        public RejectUserCommandHandler(IDataUserRepository dataUserRepository, IUserIdentityService userIdentityService, IEmailServices emailServices)
        {
            _dataUserRepository = dataUserRepository;
            _userIdentityService = userIdentityService;
            _emailServices = emailServices;
        }
        public async Task<string> HandleAsync(ValidateUserCommand command)
        {
            if (await _dataUserRepository.IsValidUserByDNI(command.DNI))
            {
                await _dataUserRepository.RejectUser(command.DNI);

                var user = await _dataUserRepository.GetByDNI(command.DNI);
                var appUser = await _userIdentityService.GetByIdIdentityUser(user.Createby);

                await _emailServices.SendEmailAsync(new Models.Emails.Email
                {
                    TO = appUser.Email,
                    Subject = "¡Tu identidad ha sido validada con éxito!",
                    Body = CreateIdentityRejectionBodyPlainText(string.Concat(appUser.Name, " ", appUser.LastName)),
                    BodyHTML = CreateIdentityRejectionBodyHtml(string.Concat(appUser.Name, " ", appUser.LastName))
                });
                return "¡Validación rechazada con éxito!";
            }
            throw new ArgumentException($"Usuario con DNI: {command.DNI} inexistente.");
        }
        private string CreateIdentityRejectionBodyPlainText(string fullName)
        {
            return @$"Lo sentimos, no pudimos validar tu identidad
Hola {fullName},

Lamentamos informarte que no hemos podido validar tu identidad.

Por favor, revisa los datos proporcionados o contáctanos para recibir asistencia y realizar un nuevo intento.

¡Estamos aquí para ayudarte!

© {DateTime.Now.ToUniversalTime().Year} Financia.al | Todos los derechos reservados";
        }
        private string CreateIdentityRejectionBodyHtml(string fullName)
        {
            return @$"<!DOCTYPE html>
<html lang=""es"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Validación de Identidad Rechazada</title>
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
            <h2>Lo sentimos, no pudimos validar tu identidad</h2>
            <p>Hola <strong>{fullName}</strong>,</p>
            <p>Lamentamos informarte que no hemos podido validar tu identidad.</p>
            <p>Por favor, revisa los datos proporcionados o contáctanos para recibir asistencia y realizar un nuevo intento.</p>
            <p>¡Estamos aquí para ayudarte!</p>
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
