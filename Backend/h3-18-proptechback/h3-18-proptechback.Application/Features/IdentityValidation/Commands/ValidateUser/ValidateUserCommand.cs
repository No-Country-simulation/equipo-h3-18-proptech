using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateUser
{
    public class ValidateUserCommand
    {
        public string DNI { get; set; }

        public ValidateUserCommand(string dNI)
        {
            DNI = dNI;
        }
    }
}
