using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers
{
    public interface IDocumentsUserRepository : IGenericRepository<DocumentsUser>
    {
        Task AddDocumentsValidateIdentity(string[] URLs, string DNI);
        Task OverrideDocumentsValidateIdentity(string[] URLs, string DNI);
        Task<DocumentsUser> GetLastDataUser(string DNI);
        Task<DocumentsUser> GetDocumentsIncludeDataByLoanRequestId(Guid loanRequestId);
    }
}
