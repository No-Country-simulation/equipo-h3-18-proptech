using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace h3_18_proptechback.Identity.Configurations
{
    public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
        {
            builder.HasData(
                new IdentityUserRole<string> 
                { 
                    //Administrador
                    RoleId = "3d46b36f-1b0b-46b1-8d48-c92471fef3f5",
                    UserId = "1a103102-21f7-4e3f-b7b0-6f192fb511e5"
                },
                new IdentityUserRole<string>
                {
                    //Inversor
                    RoleId = "0f50b7ed-d655-4ddb-b7d8-c0aa6f3ca027",
                    UserId = "7691104e-2fde-4a76-8f1a-4da658956946"
                },
                new IdentityUserRole<string>
                {
                    //Operador
                    RoleId = "71904571-af3d-41db-9e20-724c63274628",
                    UserId = "d0219b3e-50f7-47bb-8894-19a980d87c0f"
                },
                new IdentityUserRole<string>
                {
                    //Cliente
                    RoleId = "5c4129ad-e468-49fc-a0e1-315398c31107",
                    UserId = "0d03a597-4e8a-412a-b634-130b3e333244"
                }


                );
        }
    }
}
