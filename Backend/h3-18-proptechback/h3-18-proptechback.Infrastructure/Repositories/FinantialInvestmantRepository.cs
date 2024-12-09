using h3_18_proptechback.Application.Contracts.Persistence;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class FinantialInvestmantRepository : GenericRepository<Investmant>, IFinantialInvestmant
    {
        public FinantialInvestmantRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
