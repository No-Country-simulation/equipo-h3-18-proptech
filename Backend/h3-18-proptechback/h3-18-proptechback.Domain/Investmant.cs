﻿using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Domain
{
    public class Investmant: BaseEntity
    {
        public decimal CaptialIntial { get; set; }

        public DateTime Dateinitial { get; set; }

        public int Moth { get; set; }

        public int year { get; set; }

        public DateTime DatePaymant { get; set; }

        public bool Isactive { get; set; }

        public bool IsPayed { get; set; }

        public decimal? MonthlyInterest { get; set; }

        public decimal? Share { get; set; }

        public decimal? profit { get; set; }

        public decimal? returnInvestmant { get; set; }

        
    }
}