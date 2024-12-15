using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant
{
    public class AddInvestmantCommand
    {
        public decimal CapitalInitial { get; set; }

        public DateTime? DatePayment { get; set; }

        public bool IsActive { get; set; }

        public bool IsPayed { get; set; }

        public decimal TotalProfit { get; set; }

        public decimal ReturnInvestment { get; set; }

        public AddInvestmantCommand()
        {

        }

        
        public AddInvestmantCommand(decimal CapitalInitial, decimal returnInvestmant)
        {
            this.CapitalInitial = CapitalInitial;
            
            this.ReturnInvestment = returnInvestmant;
        }
    }
}
