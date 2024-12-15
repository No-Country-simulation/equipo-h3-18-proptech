using h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class FinatialInvestmentFeeRepository : GenericRepository<InvestmentFee>, IFinatialInvestmentFee
    {
        public FinatialInvestmentFeeRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<InvestmentFee>> Getpermonth(Guid investmantId)
        {
           return _context.investmentFees.Where(x=> x.InvestmantId == investmantId)
                .OrderBy(x => x.CreatedDate)
                .ToList();
            

        }
    }
}
