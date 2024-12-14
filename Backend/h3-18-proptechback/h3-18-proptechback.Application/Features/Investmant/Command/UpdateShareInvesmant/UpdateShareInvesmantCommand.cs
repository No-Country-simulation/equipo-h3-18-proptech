using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.UpdateShareInvesmant
{
    public class UpdateShareInvesmantCommand
    {
        public Guid Id { get; set; }
        
        //public decimal CaptialIntial { get; set; }

        //public decimal? MonthlyInterest { get; set; }

        public decimal? Share { get; set; }

        //public decimal? profit { get; set; }

        //public decimal? returnInvestmant { get; set; }

        public UpdateShareInvesmantCommand() { }

        public UpdateShareInvesmantCommand(Guid Id)
        {
            this.Id = Id; 
        }

        
    }
}
