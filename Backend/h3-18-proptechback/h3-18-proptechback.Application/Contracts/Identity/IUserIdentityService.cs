using h3_18_proptechback.Application.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Identity
{
    public interface IUserIdentityService
    {
        Task<ApplicationUserResponse> GetIdentityUser(string email);
        Task<ApplicationUserResponse> GetByIdIdentityUser(string id);
        Task<string> UpdateEmailPhone(string currentEmail, string email, string phoneNumber);
    }
}
