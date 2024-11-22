using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Infrastructure.Persistence.Configurations
{
    internal class DocumentsUserrConfiguration : IEntityTypeConfiguration<DocumentsUser>
    {
        public void Configure(EntityTypeBuilder<DocumentsUser> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();
            builder.HasOne(d => d.DataUser);
        }
    }
}
