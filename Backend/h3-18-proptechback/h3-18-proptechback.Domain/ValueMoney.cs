﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain
{
    public class ValueMoney
    {
        public Guid MoneyId { get; set; }

        public decimal MountValue  { get; set; }

        public DateTime DateChange { get; set; }
    }
}
