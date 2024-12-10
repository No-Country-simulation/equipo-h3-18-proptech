using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Infrastructure.Configurations
{
    internal class DataGuarantorConfiguration : IEntityTypeConfiguration<DataGuarantor>
    {
        public void Configure(EntityTypeBuilder<DataGuarantor> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();

            builder.HasOne(d => d.LoanRequest);
        }
    }

    internal class LoanConfiguration : IEntityTypeConfiguration<Loan>
    {
        public void Configure(EntityTypeBuilder<Loan> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();

            builder.HasMany(d => d.Quotas)
                .WithOne(d => d.Loan)
                .HasForeignKey(d => d.LoanId);

            builder.HasOne(d => d.LoanRequest);
        }
    }
    internal class LoanRequestConfiguration : IEntityTypeConfiguration<LoanRequest>
    {
        public void Configure(EntityTypeBuilder<LoanRequest> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();
        }
    }
    internal class QuotaConfiguration : IEntityTypeConfiguration<Quota>
    {
        public void Configure(EntityTypeBuilder<Quota> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();
        }
    }
}
