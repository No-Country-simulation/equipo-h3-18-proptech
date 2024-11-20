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
        }
    }
}
