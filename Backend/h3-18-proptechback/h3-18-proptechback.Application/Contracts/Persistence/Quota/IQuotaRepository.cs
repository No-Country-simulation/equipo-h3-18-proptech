using h3_18_proptechback.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Persistence.Quota
{
    public interface IQuotaRepository : IGenericRepository<Domain.Quota>
    {
        Task<bool> IsCurrentQuota(Domain.Quota quota);
    }
}
