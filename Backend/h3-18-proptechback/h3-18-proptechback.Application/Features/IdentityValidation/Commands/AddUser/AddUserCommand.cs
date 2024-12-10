using Microsoft.AspNetCore.Http;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddUser
{
    public class AddUserCommand
    {
        public string DNI { get; set; }
        public string CUIT { get; set; }
        public IFormFile Photo { get; set; }

        public IFormFile Front { get; set; }

        public IFormFile Back { get; set; }
        public AddUserCommand()
        {

        }
    }
}
