using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
using h3_18_proptechback.Domain;
using h3_18_proptechback.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Repositories
{
    internal class DocumentsGuarantorRepository : GenericRepository<DocumentsGuarantor>, IDocumentsGuarantorRepository
    {
        public DocumentsGuarantorRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddDocumentsValidateIdentity(string[] URLs, string DNI)
        {
            var userExists = await _context.DataGuarantors.FirstOrDefaultAsync(d => d.DNI == DNI);

            if (userExists is null)
            {
                throw new Exception($"El data user con el DNI : {DNI} no existe");
            }

            await _context.DocumentsGuarantors.AddAsync(
                new DocumentsGuarantor
                {
                    FrontDNIURL = URLs[0],
                    BackDNIURL = URLs[1],
                    PhotoURL = URLs[2],
                    DataGuarantorID = userExists.ID,
                    DataGuarantor = userExists,
                    CreatedDate = DateTime.Now.ToUniversalTime(),
                    Createby = "System",
                });
            await _context.SaveChangesAsync();

        }

        public async Task<List<DocumentsGuarantor>> GetDocIncludeDataGuaByLoanRequestId(Guid loanRequestId)
        {
            return await _context.DocumentsGuarantors.Include(d=>d.DataGuarantor)
                .Where(d=>d.DataGuarantor.LoanRequestId == loanRequestId)
                .ToListAsync();
        }
    }
}
