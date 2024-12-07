using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.MyAllLoan
{
    public class MyAllLoanQueryResponse
    {
        public Guid IdLoan { get; set; }
        public DateTime nextExpirationDate {  get; set; }
        public decimal RemainingAmount { get; set; }
        public decimal PayedPercentage { get; set; }
        public StateLoan StateLoan { get; set; }
        public string CurrentQuota { get; set; }
        public decimal QuotaValue { get; set; }
        public MyAllLoanQueryResponse(Guid idLoan, DateTime nextExpirationDate, decimal remainingAmount, decimal payedPercentage, StateLoan stateLoan, string currentQuota, decimal quotaValue)
        {
            IdLoan = idLoan;
            this.nextExpirationDate = nextExpirationDate;
            RemainingAmount = remainingAmount;
            PayedPercentage = payedPercentage;
            StateLoan = stateLoan;
            CurrentQuota = currentQuota;
            QuotaValue = quotaValue;
        }
    }
}
