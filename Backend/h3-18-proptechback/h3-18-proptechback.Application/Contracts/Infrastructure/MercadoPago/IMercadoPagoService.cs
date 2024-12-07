using h3_18_proptechback.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Contracts.Infrastructure.MercadoPago
{
    public interface IMercadoPagoService
    {
        Task<string> CreateAndGetPreferenceID(Quota quota);
        Task<Guid?> GetIdQuota(string idPayment);
    }
}
