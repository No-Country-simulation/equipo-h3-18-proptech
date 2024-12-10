namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetDetailsRequestValidation
{
    public class DetailReqIdentityQueryResponse
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DNI { get; set; } 
        public string CUIT { get; set; }
        public string Photo { get; set; }
        public string FrontDNI { get; set; }
        public string BackDNI { get; set; }
        public DetailReqIdentityQueryResponse()
        {
            
        }
        public DetailReqIdentityQueryResponse(string name, string lastName, string email, string phoneNumber, string dNI, string cUIT, string photo, string frontDNI, string backDNI)
        {
            Name = name;
            LastName = lastName;
            Email = email;
            PhoneNumber = phoneNumber;
            DNI = dNI;
            CUIT = cUIT;
            Photo = photo;
            FrontDNI = frontDNI;
            BackDNI = backDNI;
        }
    }
}
