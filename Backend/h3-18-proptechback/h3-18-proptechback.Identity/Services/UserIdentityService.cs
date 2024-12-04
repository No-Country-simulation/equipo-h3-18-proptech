using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Identity;
using h3_18_proptechback.Infrastructure.Email;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using h3_18_proptechback.Application.Contracts.Infrastructure.SendEmails;

namespace h3_18_proptechback.Identity.Services
{
    internal class UserIdentityService : IUserIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AuthServices _authServices;
        private readonly IEmailServices _emailServices;
        
        public UserIdentityService(UserManager<ApplicationUser> userManager, AuthServices authServices, IEmailServices emailServices)
        {
            _userManager = userManager;
            _authServices = authServices;
            _emailServices = emailServices;
        }

        public async Task<ApplicationUserResponse> GetIdentityUser(string email)
        {
            var existsUser = await _userManager.FindByEmailAsync(email);
            if (existsUser is null)
                throw new ArgumentException("Usuario no encontrado!");

            ApplicationUserResponse response = new ApplicationUserResponse()
            {
                Name = existsUser.Nombre,
                Email = email,
                LastName = existsUser.Apellido,
                PhoneNumber = existsUser.PhoneNumber,
                Id = existsUser.Id
            };
            return response;
        }

        public async Task<string> UpdateEmailPhone(string currentEmail, string newEmail, string phoneNumber)
        {
            var existsUser = await _userManager.FindByEmailAsync(currentEmail);
            if (existsUser is null)
                throw new ArgumentException("Usuario no encontrado.");

            existsUser.Email = newEmail;
            existsUser.PhoneNumber = phoneNumber;
            existsUser.UserName = newEmail;

            var updateResult = await _userManager.UpdateAsync(existsUser);
            if (updateResult.Succeeded)
            {
                await _emailServices.SendEmailAsync(
                    new Application.Models.Emails.Email {
                    TO = newEmail,
                    Subject = "Perfil Actualizado exitosamente",
                    Body = $"Se a actualizado {updateResult} exitosamente"
                    
                    } );
                var resultToken = await _authServices.GenerateToken(existsUser);
                return new JwtSecurityTokenHandler().WriteToken(resultToken);
            }

            throw new Exception("Error al guardar los datos.");

        }
    }
}
