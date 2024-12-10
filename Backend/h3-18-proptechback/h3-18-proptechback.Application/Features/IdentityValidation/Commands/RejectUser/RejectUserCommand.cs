namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.RejectUser
{
    public class RejectUserCommand
    {
        public string DNI { get; set; }

        public RejectUserCommand(string dNI)
        {
            DNI = dNI;
        }
    }
}
