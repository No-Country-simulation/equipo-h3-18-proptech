using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator
{
    public class CreditSimulatorCommand
    {
        public decimal LotCost { get; set; }
        public decimal DownPayment { get; set; }
        public int QuotasCount { get; set; }
        public CreditSimulatorCommand(decimal lotCost, decimal downPayment, int quotasCount)
        {
            LotCost = lotCost;
            DownPayment = downPayment;
            QuotasCount = quotasCount;
        }

    }
}
