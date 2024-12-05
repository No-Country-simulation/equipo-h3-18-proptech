

using AutoMapper.Configuration.Annotations;

namespace h3_18_proptechback.Application.Models.Identity
{
    public class RegistrationRequest
    {
        public string Name { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string PhoneNumber {  get; set; } = string.Empty;

        public string rol { get; set; } = string.Empty;
    }
}
