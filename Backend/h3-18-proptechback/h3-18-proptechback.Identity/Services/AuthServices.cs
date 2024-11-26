using h3_18_proptechback.Application.Constants;
using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace h3_18_proptechback.Identity.Services
{
    public class AuthServices : IAuthServices
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtSettings _jwtSettings;

        public AuthServices(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<JwtSettings>  jwtSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings.Value;
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

            var token = await GenerateToken(user);
            var authResponse = new AuthReponse
            {
                Id = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email = user.Email,
                UserName = user.UserName,
               

            };
            return authResponse;
        }

        public async Task<RegistrationResponse> Register(RegistrationRequest request, string rol)
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
                    PhoneNumber = request.PhoneNumber,
                    PhoneNumberConfirmed = request.PhoneNumberConfirmed,
                    EmailConfirmed = true
                };

                
                var result = await _userManager.AddPasswordAsync(user, request.Password);
                if (result.Succeeded) 
                {
                    await _userManager.AddToRoleAsync(user, rol);
                    var token = await GenerateToken(user);
                    return new RegistrationResponse
                    {
                        Email = user.Email,
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        Id = user.Id,
                        UserName = user.UserName
                    };

                }

                 throw new Exception($"{result.Errors}");
            }

        public async Task<JwtSecurityToken> GenerateToken(ApplicationUser user) 
        { 
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            foreach (var role in roles) 
            { 
                roleClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(CustomClaimTypes.Uid, user.Id),
            }.Union(userClaims).Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            
            var signingCredentials = new  SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinute),
                signingCredentials: signingCredentials);
            
            return jwtSecurityToken;

            

        }
        
        public enum ROL
        { 
            Administrador,

            Operador,
            
            Cliente,

            Inversor

        }
    }
}
