using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Infrastructure.Configurations
{
    internal class DocumentsGuarantorConfiguration : IEntityTypeConfiguration<DocumentsGuarantor>
    {
        public void Configure(EntityTypeBuilder<DocumentsGuarantor> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();
            builder.HasOne(d => d.DataGuarantor);
        }
    }
}
