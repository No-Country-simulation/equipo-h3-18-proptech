using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Calculators
{
    public class InvestmantCalculator
    {
        public static class InvestmentInterest 
        {
            public const double interest = 0.01531;
        }

        private readonly decimal _initialInvestment;
        private readonly double _interest;


        public InvestmantCalculator(decimal initialInvestment, double interest, int months)
        {
            _initialInvestment = initialInvestment;
            _interest = InvestmentInterest.interest;

        }

    }
}
