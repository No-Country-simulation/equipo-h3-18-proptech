using Microsoft.AspNetCore.Http;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.ValidateIdentityFiles
{
    public class ValidateIdentityFilesCommand
    {
        public IFormFile Photo { get; set; }
        public IFormFile Front { get; set; }
        public IFormFile Back { get; set; }
        public string DNI { get; set; }
        public bool IsDataUser { get; set; }
        public ValidateIdentityFilesCommand()
        {

        }
        public ValidateIdentityFilesCommand(IFormFile photo, IFormFile front, IFormFile back, string DNI, bool isDataUser)
        {
            Front = front;
            Back = back;
            Photo = photo;
            this.DNI = DNI;
            IsDataUser = isDataUser;
        }
    }
}
