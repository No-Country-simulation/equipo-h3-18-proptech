using h3_18_proptechback.Application.Contracts.Persistence.LoanRequest;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class LoanRequestRepository : GenericRepository<LoanRequest>, ILoanRequestRepository
    {
        public LoanRequestRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
