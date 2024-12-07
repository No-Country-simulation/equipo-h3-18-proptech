using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.ClientLoan
{
    public class ClientLoanQueryResponse
    {
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public StateQuota? StateQuota { get; set; }
        public Guid LoanId { get; set; }
        public List<ClientQuotaQueryResponse> Quotas { get; set; }
        public ClientLoanQueryResponse(int page, int totalPages, StateQuota? stateQuota, List<ClientQuotaQueryResponse> quotas, Guid loanId)
        {
            Page = page;
            TotalPages = totalPages;
            StateQuota = stateQuota;
            Quotas = quotas;
            LoanId = loanId;
        }
    }

    public class ClientQuotaQueryResponse
    {
        public Guid QuotaId { get; set; }
        public string QuotaNumber { get; set; }
        public DateTime ExpiredDate { get; set; }
        public StateQuota StateQuota { get; set; }
        public decimal Amount { get; set; }
        public string PreferenceID { get; set; }
        public ClientQuotaQueryResponse(Guid quotaId, string quotaNumber, DateTime expiredDate, StateQuota stateQuota, decimal amount, string preferenceID)
        {
            QuotaId = quotaId;
            QuotaNumber = quotaNumber;
            ExpiredDate = expiredDate;
            StateQuota = stateQuota;
            Amount = amount;
            PreferenceID = preferenceID;
        }
    }
}
