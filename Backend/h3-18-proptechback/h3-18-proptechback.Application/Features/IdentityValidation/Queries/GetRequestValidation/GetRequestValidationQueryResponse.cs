using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Queries.GetRequestValidation
{
    public class GetRequestValidationQueryResponse
    {
        public string FullName { get; set; }
        public string Role {  get; set; }
        public DateTime? DateRequest { get; set; }
        public string DNI {  get; set; }
    }
}
