﻿using h3_18_proptechback.Domain;
using Microsoft.EntityFrameworkCore;
using System.Reflection;


namespace h3_18_proptechback.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            modelBuilder.Entity<Investmant>()
                .HasMany(i => i.InvestmentFees)
                .WithOne(f => f.Investmant)
                .HasForeignKey(f => f.InvestmantId);

        }

        public DbSet<DataUser> DataUsers { get; set; }
        public DbSet<DataGuarantor> DataGuarantors { get; set; }
        public DbSet<DocumentsUser> DocumentsUsers { get; set; }
        public DbSet<DocumentsGuarantor> DocumentsGuarantors { get; set; }
        public DbSet<Loan> Loans { get; set; }
        public DbSet<LoanRequest> LoanRequests { get; set; }
        public DbSet<Quota> Quotas { get; set; }
        public DbSet<Money> Moneys { get; set; }
        public DbSet<Investmant> Investmants { get; set;}
        public DbSet<InvestmentFee> investmentFees { get; set; }

    }
}
