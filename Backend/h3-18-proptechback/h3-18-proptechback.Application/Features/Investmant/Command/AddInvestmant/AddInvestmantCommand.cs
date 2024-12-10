﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant
{
    public class AddInvestmantCommand
    {
        public decimal CaptialIntial { get; set; }

        public DateTime Dateinitial { get; set; }

        public DateTime DatePaymant { get; set; }

        public bool Isactive { get; set; }

        public bool IsPayed { get; set; }

        public decimal returnInvestmant { get; set; }

        public AddInvestmantCommand(decimal captialIntial, DateTime dateinitial, 
            DateTime datePaymant, bool isactive, bool isPayed, decimal returnInvestmant)
        {
            CaptialIntial = captialIntial;
            Dateinitial = dateinitial;
            DatePaymant = datePaymant;
            Isactive = isactive;
            IsPayed = isPayed;
            this.returnInvestmant = returnInvestmant;
        }
    }
}
