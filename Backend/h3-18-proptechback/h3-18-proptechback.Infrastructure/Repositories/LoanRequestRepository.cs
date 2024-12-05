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

        public async Task<LoanRequest> ValidatePendingLoanRequest(Guid id)
        {
            var pendingRequest = await GetPending(id);
            pendingRequest.StateRequest = Domain.Common.StateRequest.Valid;
            return await Update(pendingRequest);
        }
        public async Task<LoanRequest> RejectPendingLoanRequest(Guid id)
        {
            var pendingRequest = await GetPending(id);
            pendingRequest.StateRequest = Domain.Common.StateRequest.NoValid;
            return await Update(pendingRequest);
        }

        private async Task<LoanRequest> GetPending(Guid id)
        {
            var pendingRequest = await _context.LoanRequests.FirstOrDefaultAsync(l => l.StateRequest == Domain.Common.StateRequest.Pending && l.ID == id);
            if (pendingRequest is null)
                throw new ArgumentException($"No existe una solicitud de préstamo pendiente con el ID: {id}");
            return pendingRequest;
        }
    }
}
