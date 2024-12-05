using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Contracts.Persistence.LoanRequest
{
    public interface ILoanRequestRepository : IGenericRepository<Domain.LoanRequest>
    {
        Task<List<Domain.LoanRequest>> GetPendingLoanRequest();
        Task<Domain.LoanRequest> ValidatePendingLoanRequest(Guid id);
        Task<Domain.LoanRequest> RejectPendingLoanRequest(Guid id);
    }
}
