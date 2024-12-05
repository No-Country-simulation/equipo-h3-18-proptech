namespace h3_18_proptechback.Application.Contracts.Persistence.LoanRequest
{
    public interface ILoanRequestRepository : IGenericRepository<Domain.LoanRequest>
    {
        Task<List<Domain.LoanRequest>> GetPendingLoanRequest();
    }
}
