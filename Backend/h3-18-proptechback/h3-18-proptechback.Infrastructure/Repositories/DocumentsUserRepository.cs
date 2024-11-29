﻿using h3_18_proptechback.Application.Contracts.Persistence.DocumentsUsers;
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
    }
}
