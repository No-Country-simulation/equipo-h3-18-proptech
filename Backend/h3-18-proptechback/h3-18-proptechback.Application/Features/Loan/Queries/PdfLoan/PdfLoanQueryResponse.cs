using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Application.Features.Loan.Queries.PdfLoan
{
    public class PdfLoanQueryResponse
    {
        public Guid LoanId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public StateLoan StateLoan { get; set; }
        public DateTime LoanDate { get; set; }
        public List<PdfQuotaQueryResponse> Quotas { get; set; }
        public PdfLoanQueryResponse(string name, string lastName, string email, string phoneNumber, StateLoan stateLoan, DateTime loanDate, List<PdfQuotaQueryResponse> quotas, Guid loanId)
        {
            Name = name;
            LastName = lastName;
            Email = email;
            PhoneNumber = phoneNumber;
            StateLoan = stateLoan;
            LoanDate = loanDate;
            Quotas = quotas;
            LoanId = loanId;
        }
    }

    public class PdfQuotaQueryResponse
    {
        public Guid QuotaId { get; set; }
        public string QuotaNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public StateQuota StateQuota { get; set; }
        public decimal Amount { get; set; }
        public PdfQuotaQueryResponse(Guid quotaId, string quotaNumber, DateTime expirationDate, StateQuota stateQuota, decimal amount)
        {
            QuotaId = quotaId;
            QuotaNumber = quotaNumber;
            ExpirationDate = expirationDate;
            StateQuota = stateQuota;
            Amount = amount;
        }
    }
}
