using h3_18_proptechback.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Queries.GetDashboardLoan
{
    public class GetDashboardLoanQueryResponse
    {
        public class GetItemLoanQueryResponse
        {
            public Guid Id { get; set; }
            public StateLoan StateLoan { get; set; }
            public int QuotasCount { get; set; }
            public int PaymentTotal { get; set; }
        }
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalPages { get; set; }
        public bool OrderByDateDesc { get; set; }
        public StateLoan StateLoan { get; set; }
        public List<GetItemLoanQueryResponse> Items { get; set; }
    }


}
