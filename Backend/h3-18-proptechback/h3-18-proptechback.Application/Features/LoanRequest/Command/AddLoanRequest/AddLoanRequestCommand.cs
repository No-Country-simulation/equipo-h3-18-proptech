using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.AddLoanRequest
{
    public class AddLoanRequestCommand
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
        public AddLoanRequestGuaCommand Guarantor1 { get; set; }
        public AddLoanRequestGuaCommand Guarantor2 { get; set; }
    }

    public class AddLoanRequestGuaCommand
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
