using h3_18_proptechback.Application.Contracts.Identity;
using h3_18_proptechback.Application.Contracts.Persistence.Loan;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Domain.Common;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class LoanRepository : GenericRepository<Loan>, ILoanRepository
    {

        public LoanRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Loan>> GetAllLoanIncludeQuotas(StateLoan? state = null)
        {
            if(state is not null)
                return await _context.Loans.Include(l=>l.Quotas).Include(l=>l.LoanRequest).Include(l=>l.LoanRequest.DataUser).Where(d=>d.StateLoan == state.Value).ToListAsync();
            return await _context.Loans.Include(l => l.Quotas).Include(l => l.LoanRequest).Include(l => l.LoanRequest.DataUser).ToListAsync();
        }
    }
}
