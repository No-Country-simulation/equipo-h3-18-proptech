using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class Loan : BaseEntity
    {
        public Guid LoanRequestId { get; set; }
        public LoanRequest LoanRequest { get; set; }
        public StateLoan StateLoan { get; set; }
        public decimal FinancingAmount { get; set; }
        public decimal PaymentMonth { get; set; }
        public decimal TotalPayment { get; set; }
        public decimal InterestRate { get; set; }
        public ICollection<Quota> Quotas { get; set; }
    }

}
