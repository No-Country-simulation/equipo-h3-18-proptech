using h3_18_proptechback.Identity.Configurations;
using h3_18_proptechback.Identity.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Identity
{
    public class h3_18_proptechbackIdentityDbContext: IdentityDbContext<ApplicationUser>
    {
        public h3_18_proptechbackIdentityDbContext(DbContextOptions<h3_18_proptechbackIdentityDbContext> options): base(options) 
        { 
        }
      

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new UserRoleConfiguration());
        }
    }
}
