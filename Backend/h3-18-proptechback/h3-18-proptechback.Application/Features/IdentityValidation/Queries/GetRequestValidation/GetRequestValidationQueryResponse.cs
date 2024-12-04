using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation
{
    public class GetRequestValidationQueryResponse
    {
        public Guid IdRequest { get; set; }
        public string FullName { get; set; }
        public string Role {  get; set; }
    }
}
