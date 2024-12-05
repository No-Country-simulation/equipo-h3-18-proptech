using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class LoanRequestRepository : GenericRepository<LoanRequest>, ILoanRequestRepository
    {
        public LoanRequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Domain.LoanRequest>> GetPendingLoanRequest()
        {
            var requests = await _context.LoanRequests.AsNoTracking().Where(l => l.StateRequest == Domain.Common.StateRequest.Pending)
                .OrderBy(l => l.Createby).Include(l=>l.DataUser).ToListAsync();
            return requests;
        }
    }
}
