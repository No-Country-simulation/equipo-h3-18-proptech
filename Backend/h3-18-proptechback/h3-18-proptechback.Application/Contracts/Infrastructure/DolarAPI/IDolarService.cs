﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Infrastructure.DolarAPI
{
    public interface IDolarService
    {
        Task<decimal> GetValueInARS(decimal valueInUS);
    }
}