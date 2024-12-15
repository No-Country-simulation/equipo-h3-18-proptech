﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmantFee
{
    public class AddInvestmantFeeCommand
    {
        public Guid InvestmantId { get; set; }

        public DateTime DateCloseShare { get; set; }

        public int Month { get; set; }

        public decimal Profit { get; set; }

        public AddInvestmantFeeCommand()
        {
            
        }
    }
}
