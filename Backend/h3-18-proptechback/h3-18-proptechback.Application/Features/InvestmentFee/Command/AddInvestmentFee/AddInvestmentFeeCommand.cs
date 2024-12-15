using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee
{
    public class AddInvestmentFeeCommand
    {
        public decimal CapitalInitial { get; set; }

        public DateTime? DatePayment { get; set; }

        public bool IsActive { get; set; }

        public bool IsPayed { get; set; }

        public decimal TotalProfit { get; set; }

        public decimal ReturnInvestment { get; set; }

        public AddInvestmentFeeCommand()
        {
            
        }
    }
}
