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
            var query = _context.Loans.Include(l => l.Quotas)
                    .Include(l => l.LoanRequest)
                    .Include(l => l.LoanRequest.DataUser);
            if (state is not null)
                return await query.Where(d=>d.StateLoan == state.Value)
                    .ToListAsync();
            return await query.ToListAsync();
        }

        public async Task<List<Loan>> GetMyAllLoanIncludeQuotas(string idUser)
        {
            return await _context.Loans.Include(l => l.Quotas)
                .Include(l => l.LoanRequest)
                .Include(l => l.LoanRequest.DataUser)
                .Where(l=>l.LoanRequest.DataUser.Createby == idUser)
                .ToListAsync();
        }
    }
}
