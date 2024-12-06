using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    internal class DocumentsUserRepository : GenericRepository<DocumentsUser>, IDocumentsUserRepository
    {
        public DocumentsUserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddDocumentsValidateIdentity(string[] URLs, string DNI)
        {
            var userExists = await _context.DataUsers.FirstOrDefaultAsync(d=>d.DNI == DNI);

            if(userExists is null)
            {
                throw new Exception($"El data user con el DNI : {DNI} no existe");
            }

            await _context.DocumentsUsers.AddAsync(
                new DocumentsUser { 
                    FrontDNIURL = URLs[0],
                    BackDNIURL = URLs[1],
                    PhotoURL = URLs[2],
                    DataUserID = userExists.ID,
                    DataUser = userExists,
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                    Createby = "System",
                });
            await _context.SaveChangesAsync();
            
        }

        public async Task<DocumentsUser> GetDocumentsIncludeDataByLoanRequestId(Guid loanRequestId)
        {
            return await _context.DocumentsUsers.Include(d=>d.DataUser).FirstAsync(d => d.LoanRequestId == loanRequestId);
        }

        public async Task<DocumentsUser> GetLastDataUser(string DNI)
        {
            var lastDataUser = _context.DocumentsUsers.OrderByDescending(d=>d.CreatedDate).FirstOrDefault();
            return lastDataUser;
        }

        public async Task OverrideDocumentsValidateIdentity(string[] URLs, string DNI)
        {
            var docUser = await _context.DocumentsUsers.FirstAsync(doc => doc.DataUser.DNI == DNI);
            docUser.FrontDNIURL = URLs[0];
            docUser.BackDNIURL = URLs[1];
            docUser.PhotoURL = URLs[2];
        }
    }
}
