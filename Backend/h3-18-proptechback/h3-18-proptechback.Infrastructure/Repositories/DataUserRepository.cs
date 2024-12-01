using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
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

        public async Task<bool> IsValueUser(DataUser entity)
        {
            var existe = await _context.Set<DataUser>().FindAsync(entity.DNI);
            if (existe == null)
                throw new Exception($"Es Requerido un valor ");

                return existe.IsComplete;
        }
    }
}
