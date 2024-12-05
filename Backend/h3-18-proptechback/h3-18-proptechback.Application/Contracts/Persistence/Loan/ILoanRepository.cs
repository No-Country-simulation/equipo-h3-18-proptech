using h3_18_proptechback.Domain;
using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Persistence.Loan
{
    public interface ILoanRepository : IGenericRepository<Domain.Loan>
    {
        Task<List<Domain.Loan>> GetAllLoanIncludeQuotas(StateLoan? state);
    }
}
