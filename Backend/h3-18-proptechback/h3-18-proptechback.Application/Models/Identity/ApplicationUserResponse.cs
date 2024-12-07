namespace h3_18_proptechback.Application.Models.Identity
{
    public class ApplicationUserResponse
    {
        public string Id { get; set; }    
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
    }
}
