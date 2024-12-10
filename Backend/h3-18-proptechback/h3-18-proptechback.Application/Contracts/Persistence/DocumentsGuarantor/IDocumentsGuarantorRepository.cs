using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers
{
    public interface IDocumentsGuarantorRepository : IGenericRepository<DocumentsGuarantor>
    {
        Task AddDocumentsValidateIdentity(string[] URLs, string DNI);
        Task<List<DocumentsGuarantor>> GetDocIncludeDataGuaByLoanRequestId(Guid loanRequestId);
    }
}
