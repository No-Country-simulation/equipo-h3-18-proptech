using Microsoft.AspNetCore.Identity;

namespace h3_18_proptechback.Identity.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string Nombre { get; set; } = string.Empty;

        public string Apellido { get; set; } = string.Empty;


    }
}
