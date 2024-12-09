using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.InvestmentFee.Query.GetInvestmentFeeByUserandMoth
{
    public class GetInvestmentFeeByMothQueryRequest
    {
        public string email { get; set; }

        public Guid InvestmantId { get; set; }

    }
}
