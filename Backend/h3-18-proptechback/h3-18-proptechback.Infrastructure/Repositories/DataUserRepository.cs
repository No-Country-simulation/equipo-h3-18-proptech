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
       
        public DataUserRepository(ApplicationDbContext context): base(context) 
        {
            _context = context;
        }

        public Task<bool> IsValueUser()
        {
            throw new NotImplementedException();
        }
    }
}
