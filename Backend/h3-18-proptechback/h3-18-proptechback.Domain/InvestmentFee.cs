using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain
{
    public class InvestmentFee: BaseEntity
    {
        public Guid InvestmantId { get; set; }

        public decimal IntialCapital {  get; set; } 

        public DateTime DateInitShare { get; set; }

        public DateTime DateCloseShare {  get; set; }

        public int Moth {  get; set; }

        public decimal MonthlyInterest { get; set; }

        public decimal Share {  get; set; }

        public decimal capitalization { get; set; }
    }
}
