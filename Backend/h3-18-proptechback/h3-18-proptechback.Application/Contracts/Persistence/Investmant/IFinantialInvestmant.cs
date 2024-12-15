using h3_18_proptechback.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Persistence.Investmant
{
    public interface IFinantialInvestmant : IGenericRepository<Domain.Investmant>
    {
        Task<Domain.Investmant?> InvestmentActiveByUserId(string userId);
        Task<Domain.Investmant?> InvestmentListActiveByUserId(string userId);
    }
}
