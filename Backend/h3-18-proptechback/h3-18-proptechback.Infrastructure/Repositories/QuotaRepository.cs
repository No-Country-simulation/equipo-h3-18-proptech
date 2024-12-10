using h3_18_proptechback.Application.Contracts.Persistence.Quota;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    public class QuotaRepository : GenericRepository<Quota>, IQuotaRepository
    {
        public QuotaRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<bool> IsCurrentQuota(Quota quota)
        {
            return quota.PayDate > DateTime.Now.ToUniversalTime();
        }
    }
}
