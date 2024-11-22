using h3_18_proptechback.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Infrastructure.Persistence.Data
{
    internal class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<DataUser> DataUsers { get; set; }
        public DbSet<DataGuarantor> DataGuarantors { get; set; }
        public DbSet<DocumentsUser> DocumentsUsers { get; set; }
        public DbSet<DocumentsGuarantor> DocumentsGuarantors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
