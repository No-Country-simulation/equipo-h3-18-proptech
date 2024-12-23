﻿using h3_18_proptechback.Application.Constants;
using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;
using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Identity.Models;
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
        private readonly IEmailServices _emailServices;

        public AuthServices(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<JwtSettings>  jwtSettings,
                            IEmailServices emailServices)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings.Value;
            _emailServices = emailServices;
        }

        public async Task<AuthReponse> Login(AuthRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null) 
            {
                throw new Exception($"El usuario con email {request.Email} no existe.");
            }
            
            var resultado = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
            if(!resultado.Succeeded) 
            {
                throw new Exception($"Correo y/o contraseña incorrectas.");
            }

            var token = await GenerateToken(user);
            var authResponse = new AuthReponse
            {
                Id = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email = user.Email,
                UserName = user.UserName,
               

            };
            await _emailServices.SendEmailAsync(new Application.Models.Emails.Email 
            { 
                TO = user.Email,
                Subject = "Acceso a su cuenta",
                Body = "Hemos registrado un acceso a su cuenta en caso de no ser usted por favor notifiquelo al 555-555"
            });
            return authResponse;
        }

        public async Task<RegistrationResponse> Register(RegistrationRequest request)
            {
                var existingUser = await _userManager.FindByNameAsync(request.Email);

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
                    Nombre = request.Name,
                    Apellido = request.LastName,
                    UserName = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    PhoneNumberConfirmed = true,
                    EmailConfirmed = true,
                    
                };

                
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded) 
                {
                    
                    await _userManager.AddToRoleAsync(user, request.rol);
                    await _emailServices.SendEmailAsync(new Application.Models.Emails.Email
                    {
                        TO = user.Email,
                        Subject = "Registro Exitoso",
                        Body = $"{user.Nombre} {user.Apellido} Hemos registrado su cuenta de forma exitosa"
                    });
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
                new Claim(ClaimTypes.Email, user.Email),
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

        
    }
}
