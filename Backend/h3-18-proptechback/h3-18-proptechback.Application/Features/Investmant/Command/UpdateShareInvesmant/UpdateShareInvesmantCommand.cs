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
        

        public UpdateShareInvesmantCommand() { }

        public UpdateShareInvesmantCommand(Guid Id)
        {
            this.Id = Id; 
        }

        
    }
}
