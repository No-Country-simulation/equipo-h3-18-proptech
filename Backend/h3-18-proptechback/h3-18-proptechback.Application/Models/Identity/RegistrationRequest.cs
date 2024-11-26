

namespace h3_18_proptechback.Application.Models.Identity
{
    public class RegistrationRequest
    {
        public string Nombre { get; set; } = string.Empty;

        public string Apellidos { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string PhoneNumber {  get; set; } = string.Empty;

        public bool PhoneNumberConfirmed { get; set; } = false;
    }
}
