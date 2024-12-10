using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace h3_18_proptechback.Identity.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            var hasher = new PasswordHasher<ApplicationUser>();

            builder.HasData(
                new ApplicationUser 
                { 
                    Id= "1a103102-21f7-4e3f-b7b0-6f192fb511e5",
                    Email = "admin@locahost.com",
                    NormalizedEmail= "admin@locahost.com",
                    Nombre= "Admin",
                    Apellido = "general",
                    UserName = "AdminGeneral",
                    NormalizedUserName = "AdminGeneral",
                    PasswordHash = hasher.HashPassword(null, "Abcd1234!"),
                    EmailConfirmed = true,
                },

                new ApplicationUser
                {
                    Id = "7691104e-2fde-4a76-8f1a-4da658956946",
                    Email = "inversor@locahost.com",
                    NormalizedEmail = "inversor@locahost.com",
                    Nombre = "Juan Carlos",
                    Apellido = "Perez",
                    UserName = "Inversor01",
                    NormalizedUserName = "Inversor01",
                    PasswordHash = hasher.HashPassword(null, "Abcd1234!"),
                    EmailConfirmed = true,
                },
                new ApplicationUser
                {
                    Id = "d0219b3e-50f7-47bb-8894-19a980d87c0f",
                    Email = "operador@locahost.com",
                    NormalizedEmail = "operador@locahost.com",
                    Nombre = "Carlos",
                    Apellido = "Delgado",
                    UserName = "operador01",
                    NormalizedUserName = "operador01",
                    PasswordHash = hasher.HashPassword(null, "Abcd1234!"),
                    EmailConfirmed = true,
                },
                new ApplicationUser
                {
                    Id = "0d03a597-4e8a-412a-b634-130b3e333244",
                    Email = "cliente@locahost.com",
                    NormalizedEmail = "cliente@locahost.com",
                    Nombre = "Miguel",
                    Apellido = "Estevez",
                    UserName = "cliente01",
                    NormalizedUserName = "cliente01",
                    PasswordHash = hasher.HashPassword(null, "Abcd1234!"),
                    EmailConfirmed = true,
                }
                );
        }
    }
}
