using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.DataUserValue.Queries.GetCurrentUser
{
    public class GetCurrentUserQueryResponse
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public StateRequest StateValidation { get; set; }
        public string? DNI { get; set; }
        public string? CUIT { get; set; }
        public GetCurrentUserQueryResponse()
        {

        }

        public GetCurrentUserQueryResponse(string name, string lastName, string email, string? phoneNumber)
        {
            Name = name;
            LastName = lastName;
            Email = email;
            PhoneNumber = phoneNumber;
        }
    }
}
