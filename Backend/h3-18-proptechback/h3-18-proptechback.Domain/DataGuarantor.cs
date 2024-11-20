using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain
{
    public class DataGuarantor : BaseEntity
    {
        public Guid UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? DNI { get; set; }
        public string CUIT { get; set; }
        public string? PassportID { get; set; }
        public bool IsComplete { get; set; }
    }
}
