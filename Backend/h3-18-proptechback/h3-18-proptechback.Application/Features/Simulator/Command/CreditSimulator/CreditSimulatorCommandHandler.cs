using h3_18_proptechback.Application.Features.CalculatorCredit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator
{
    public class CreditSimulatorCommandHandler
    {
        private FinancingCalculator _calculator;

        public CreditSimulatorCommandHandler()
        {
        }

        public CreditSimulatorCommandResponse Calculate(CreditSimulatorCommand command)
        {
            _calculator = new FinancingCalculator(command.LotCost, command.DownPayment, command.QuotasCount);
            var response = new CreditSimulatorCommandResponse(Math.Round(_calculator.MinimumSalary(),2),
                Math.Round(_calculator.InteresRate(),2),
                Math.Round(_calculator.TotalPayment(),2),
                Math.Round(_calculator.PaymentMonth(), 2),
                Math.Round(_calculator.FinancingAmount,2));
            return response;
        }
    }
}
