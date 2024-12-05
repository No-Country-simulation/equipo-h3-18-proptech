using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Loan.Command.RequestLoan
{
    public class RequestLoanCommand
    {
        [FromForm]
        public IFormFile Salary { get; set; }
        [FromForm]
        public IFormFile Salary2 { get; set; }
        [FromForm]
        public IFormFile Salary3 { get; set; }
        [FromForm]
        public IFormFile ProofOfAddress { get; set; }
        [FromForm]
        public decimal LotCost { get; set; }
        [FromForm]
        public decimal DownPayment { get; set; }
        [FromForm]
        public int QuotasCount { get; set; }
        [FromForm]
        public string CBU { get; set; }
        [FromForm]
        public RequestLoanGuarantorCommand Guarantor1 { get; set; }
        public RequestLoanGuarantorCommand Guarantor2 { get; set; }
    }

    public class RequestLoanGuarantorCommand
    {
        [FromForm]
        public string Name { get; set; }
        [FromForm]
        public string LastName { get; set; }
        [FromForm]
        public string DNI { get; set; }
        [FromForm]
        public string CUIT { get; set; }
        [FromForm]
        public string Email { get; set; }
        [FromForm]
        public string PhoneNumber { get; set; }
        [FromForm]
        public IFormFile Photo { get; set; }
        [FromForm]
        public IFormFile Front { get; set; }
        [FromForm]
        public IFormFile Back { get; set; }
        [FromForm]
        public IFormFile Salary { get; set; }
        [FromForm]
        public IFormFile Salary2 { get; set; }
        [FromForm]
        public IFormFile Salary3 { get; set; }
        [FromForm]
        public IFormFile ProofOfAddress { get; set; }
    }
}
