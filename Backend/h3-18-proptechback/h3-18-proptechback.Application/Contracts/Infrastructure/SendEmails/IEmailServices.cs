using h3_18_proptechback.Application.Models.Emails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails
{
    public interface IEmailServices
    {
        Task<bool> SendEmailAsync(Email email);
    }
}
