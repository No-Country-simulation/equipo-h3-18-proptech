using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Models.Identity;
using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Identity.Services
{
    internal class UserIdentityService : IUserIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AuthServices _authServices;

        public UserIdentityService(UserManager<ApplicationUser> userManager, AuthServices authServices)
        {
            _userManager = userManager;
            _authServices = authServices;
        }

        public async Task<ApplicationUserResponse> GetByIdIdentityUser(string id)
        {
            var existsUser = await _userManager.FindByIdAsync(id);
            ApplicationUserResponse response = new ApplicationUserResponse()
            {
                Name = existsUser.Nombre,
                Email = existsUser.Email,
                LastName = existsUser.Apellido,
                PhoneNumber = existsUser.PhoneNumber,
                Id = existsUser.Id,
                Role = await GetRoleIdentity(existsUser)
            };
            return response;
        }

        public async Task<string> GetRoleIdentity(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return roles.First();
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
                var resultToken = await _authServices.GenerateToken(existsUser);
                return new JwtSecurityTokenHandler().WriteToken(resultToken);
            }

            throw new Exception("Error al guardar los datos.");

        }
    }
}
