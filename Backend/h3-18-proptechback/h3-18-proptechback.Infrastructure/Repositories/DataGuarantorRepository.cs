using h3_18_proptechback.Application.Contracts.Persistence.DataGuarantor;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    internal class DataGuarantorRepository : GenericRepository<DataGuarantor>, IDataGuarantorRepository
    {
        public DataGuarantorRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
