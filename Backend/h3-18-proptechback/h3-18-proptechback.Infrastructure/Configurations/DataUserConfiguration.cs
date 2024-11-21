using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Infrastructure.Configurations
{
    internal class DataUserConfiguration : IEntityTypeConfiguration<DataUser>
    {
        public void Configure(EntityTypeBuilder<DataUser> builder)
        {
            builder.HasKey(d => d.ID);
            builder.Property(d => d.ID)
                .ValueGeneratedOnAdd();
        }
    }
}
