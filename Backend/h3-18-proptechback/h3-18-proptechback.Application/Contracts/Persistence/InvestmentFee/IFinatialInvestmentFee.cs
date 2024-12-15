using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Persistence.InvestmentFee
{
    public interface IFinatialInvestmentFee: IGenericRepository<Domain.InvestmentFee>
    {
        Task<List<Domain.InvestmentFee>> Getpermonth(Guid investmantId);
    }
}
