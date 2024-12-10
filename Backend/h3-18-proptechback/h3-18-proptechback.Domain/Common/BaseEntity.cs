using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain.Common
{
    public class BaseEntity
    {
        public Guid ID { get; set; }
        
        public DateTime? CreatedDate { get; set; }
        
        public string? Createby { get; set; }

        public DateTime? LastModifiedDate { get; set; }
        
        public string? LastModifiedBy { get; set; }
    }
}
