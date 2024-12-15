using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain
{
    public class InvestmentFee: BaseEntity
    {
        public Guid InvestmantId { get; set; }

        public Investmant Investmant { get; set; }

        public DateTime DateCloseShare { get; set; }

        public decimal Profit { get; set; }

    }
}
