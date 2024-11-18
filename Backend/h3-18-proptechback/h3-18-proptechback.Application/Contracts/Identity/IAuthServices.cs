using h3_18_proptechback.Application.Models.Identity;


namespace h3_18_proptechback.Application.Contracts.Identity
{
    public interface IAuthServices
    {
        Task<AuthReponse> Login(AuthRequest request);

        Task<RegistrationResponse> Register(RegistrationRequest request);


    }
}
