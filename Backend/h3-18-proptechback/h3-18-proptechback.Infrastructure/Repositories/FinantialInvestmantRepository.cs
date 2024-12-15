using h3_18_proptechback.Application.Contracts.Persistence;
using h3_18_proptechback.Application.Contracts.Persistence.Investmant;
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
    public class FinantialInvestmantRepository : GenericRepository<Investmant>, IFinantialInvestmant
    {
        public FinantialInvestmantRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Investmant?> InvestmentActiveByUserId(string userId)
        {
            return await _context.Investmants.FirstOrDefaultAsync(i => i.Createby == userId &&
                                                        i.IsPayed == false && i.IsActive == true);
        }

        public async Task<Investmant?> InvestmentListActiveByUserId(string userId)
        {
            return await _context.Investmants.AsNoTracking()
                                             .Include(i=>i.InvestmentFees)
                                             .FirstOrDefaultAsync(i => i.Createby == userId &&
                                             i.IsPayed == false && i.IsActive == true);
        }
    }
}
