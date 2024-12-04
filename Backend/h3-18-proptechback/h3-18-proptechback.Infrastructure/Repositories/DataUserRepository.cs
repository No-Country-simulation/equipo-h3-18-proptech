using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class DataUserRepository : GenericRepository<DataUser>, IDataUserRepository
    {

        public DataUserRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<DataUser?> GetUserByGuidIdentity(string id)
        {
            var user = await _context.DataUsers.FirstOrDefaultAsync(d=>d.Createby == id);
            return user;
        }

        public async Task<bool> IsMine(string DNI, string idUser)
        {
            return await _context.DataUsers.AnyAsync(d => d.DNI == DNI && d.Createby == idUser);
        }

        public async Task<bool> IsValidUserByDNI(string DNI)
        {
            var exists = await _context.DataUsers.AnyAsync(du => du.DNI == DNI);

            return exists;
        }

        public async Task<bool> IsValueUser(DataUser entity)
        {
            var existe = await _context.Set<DataUser>().FindAsync(entity.DNI);
            if (existe == null)
                throw new Exception($"Es Requerido un valor");

                return true;
        }

        public async Task RejectUser(string DNI)
        {
            var user = await _context.DataUsers.FirstOrDefaultAsync(du => du.DNI == DNI);
            if (user.StateValidation is Domain.Common.StateRequest.Valid)
                throw new ArgumentException("No puedes rechazar una solicitud que fue validada previamente.");
            user.StateValidation = Domain.Common.StateRequest.NoValid;

            await Update(user);
            return;
        }

        public async Task ValidateUser(string DNI)
        {
            var user = await _context.DataUsers.FirstOrDefaultAsync(du => du.DNI == DNI);
            if(user.StateValidation is Domain.Common.StateRequest.NoValid)
                throw new ArgumentException("No puedes validar una solicitud que fue rechazada previamente.");
            user.StateValidation = Domain.Common.StateRequest.Valid;

            await Update(user);
            return;
        }
    }
}
