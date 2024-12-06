using System;
using System.Collections.Generic;
using System.Linq;
namespace h3_18_proptechback.Application.Features.Loan.Queries.DetailLoanReq
{
    public sealed class DetailLoanReqBase
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string DNI { get; set; }
        public string CUIT { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int CreditScore { get; set; }
        public string SalaryURL { get; set; }
        public string Salary2URL { get; set; }
        public string Salary3URL { get; set; }
        public string ProofOfAddressURL { get; set; }
    }
    public class DetailLoanReqQueryResponse
    {
        public string LotCost { get; set; }
        public string DownPayment { get; set; }
        public string QuotasCount { get; set; }
        
    }
}
