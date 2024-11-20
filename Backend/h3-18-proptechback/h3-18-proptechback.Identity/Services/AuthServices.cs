using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;


namespace h3_18_proptechback.Identity.Services
{
    public class AuthServices : IAuthServices
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtSettings _jwtSettings;

        public AuthServices(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtSettings jwtSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings;
        }

        public async Task<AuthReponse> Login(AuthRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null) 
            {
                throw new Exception($"E usuario con email {request.Email} no existe");
            }
            
            var resultado = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
            if(!resultado.Succeeded) 
            {
                throw new Exception($"Las credenciales son incorrectas");
            }

            var authResponse = new AuthReponse
            {
                Id = user.Id,
                Token = "",
                Email = user.Email,
                UserName = user.UserName,

            };
            return authResponse;
        }

            public async Task<RegistrationResponse> Register(RegistrationRequest request)
            {
                var existingUser = await _userManager.FindByNameAsync(request.Username);

                if (existingUser != null) 
                {
                    throw new Exception($"El usuario ya se encuentra Registrado");
                }

                var existingEmail = await _userManager.FindByEmailAsync(request.Email);
                
                if (existingEmail != null)
                {
                    throw new Exception($"El Correo ya se encuentra Registrado");
                }

                var user = new ApplicationUser
                {
                    Email = request.Email,
                    Nombre = request.Nombre,
                    Apellido = request.Apellidos,
                    UserName = request.Username,
                    EmailConfirmed = true
                };

                var result = await _userManager.AddPasswordAsync(user, request.Password);
                if (result.Succeeded) 
                {
                    await _userManager.AddToRoleAsync(user, "Cliente");
                    return new RegistrationResponse
                    {
                        Email = user.Email,
                        Token = "",
                        Id = user.Id,
                        UserName = user.UserName
                    };

                }

                 throw new Exception($"{result.Errors}");
            }
    }
}
