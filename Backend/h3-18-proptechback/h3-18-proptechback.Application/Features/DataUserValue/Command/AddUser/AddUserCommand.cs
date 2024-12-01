using h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateIdentityFiles;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.DataUserValue.Command.AddUser
{
    public class AddUserCommand
    {
        public string DNI {  get; set; }
        public string CUIT { get; set; }
        public IFormFile Photo { get; set; }

        public IFormFile Front { get; set; }

        public IFormFile Back { get; set; }
        public AddUserCommand()
        {
            
        }
    }
}
