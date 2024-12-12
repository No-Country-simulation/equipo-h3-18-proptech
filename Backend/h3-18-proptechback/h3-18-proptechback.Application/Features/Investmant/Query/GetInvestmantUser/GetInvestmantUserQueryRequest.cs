using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser
{
    public class GetInvestmantUserQueryRequest
    {
       

        public string email { get; set; }

        public GetInvestmantUserQueryRequest(string email)
        {
            this.email = email;
        }
    }
}
