using Microsoft.AspNetCore.Http;

namespace h3_18_proptechback.Application.Features.DocumentsUser.Command.AddDocumentsUser
{
    public class AddDocumentsUserCommand
    {
        public IFormFile Photo { get; set; }
        public IFormFile Front { get; set; }
        public IFormFile Back { get; set; }
        public string DNI { get; set; }
        public bool IsDataUser { get; set; }
        public bool IsOverride {  get; set; }
        public AddDocumentsUserCommand()
        {

        }
        public AddDocumentsUserCommand(IFormFile photo, IFormFile front, IFormFile back, string DNI, bool isDataUser, bool isOverride)
        {
            Front = front;
            Back = back;
            Photo = photo;
            this.DNI = DNI;
            IsDataUser = isDataUser;
            IsOverride = isOverride;
        }
    }
}
