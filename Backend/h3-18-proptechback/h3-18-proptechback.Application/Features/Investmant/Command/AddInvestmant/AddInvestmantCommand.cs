using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant
{
    public class AddInvestmantCommand
    {
        public decimal CaptialIntial { get; set; }

        //public DateTime Dateinitial { get; set; }

        //public int Moth { get; set; }

        //public int year { get; set; }

        //public DateTime DatePaymant { get; set; }

        //public bool Isactive { get; set; }

        //public bool IsPayed { get; set; }

        public decimal? MonthlyInterest { get; set; }

        public decimal? Share { get; set; }

        public decimal? profit { get; set; }

        public decimal? returnInvestmant { get; set; }

        public AddInvestmantCommand()
        {
            
        }

        public AddInvestmantCommand(decimal captialIntial, decimal returnInvestmant)
        {
            CaptialIntial = captialIntial;
            //Dateinitial = dateinitial;
            //DatePaymant = datePaymant;
            //Isactive = isactive;
            //IsPayed = isPayed;
            this.returnInvestmant = returnInvestmant;
        }
    }
}
