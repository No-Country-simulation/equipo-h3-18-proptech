using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Models.Emails;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
namespace h3_18_proptechback.Infrastructure.Email
{
    public class EmailService : IEmailServices
    {
        public EmailSettings _emailSettings { get; }
        public ILogger<EmailSettings> _Logger { get; }

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailSettings> logger)
        {
            _emailSettings = emailSettings.Value;
            _Logger = logger;
        }

        public async Task<bool> SendEmailAsync(Application.Models.Emails.Email email)
        {
            
            var client = new SendGridClient(_emailSettings.ApiKey);

            var subject = new EmailAddress(email.TO);

            var to = email.Subject;
            
            var emailBody = email.Body;

            var from = new EmailAddress
            {
                Email = _emailSettings.FromAddress,
                
               
                Name = _emailSettings.FromName
            };

            var sendGridMessage= MailHelper.CreateSingleEmail(from, subject, to, emailBody, email.BodyHTML?? emailBody);

            var response = await client.SendEmailAsync(sendGridMessage);
            var result = await response.Body.ReadAsStringAsync();
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted || response.StatusCode == System.Net.HttpStatusCode.OK)
            {

                return true;
            }

            _Logger.LogError("El Email no pudo enviarse, existen errores");
            return false;

        }
    }
}
