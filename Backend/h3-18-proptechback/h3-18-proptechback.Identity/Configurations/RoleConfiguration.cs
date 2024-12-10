using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace h3_18_proptechback.Identity.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Id = "3d46b36f-1b0b-46b1-8d48-c92471fef3f5",
                    Name = "Administrador",
                    NormalizedName= "Administrador"
                },

                new IdentityRole
                {
                    Id = "71904571-af3d-41db-9e20-724c63274628",
                    Name = "Operador",
                    NormalizedName = "Operador"
                },
                new IdentityRole
                {
                    Id = "5c4129ad-e468-49fc-a0e1-315398c31107",
                    Name = "Cliente",
                    NormalizedName = "Cliente"
                },
                new IdentityRole
                {
                    Id = "0f50b7ed-d655-4ddb-b7d8-c0aa6f3ca027",
                    Name = "Inversor",
                    NormalizedName = "Inversor"
                }

                );
        }
    }
}
