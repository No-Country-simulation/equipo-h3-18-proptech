namespace h3_18_proptechback.Application.Features.LoanRequest.Queries.DetailsLoanRequest
{
    public class DetailLoanReqBase
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

        public DetailLoanReqBase(string name, string lastName, string dNI, string cUIT, string email, string phoneNumber, int creditScore, string salaryURL, string salary2URL, string salary3URL, string proofOfAddressURL)
        {
            Name = name;
            LastName = lastName;
            DNI = dNI;
            CUIT = cUIT;
            Email = email;
            PhoneNumber = phoneNumber;
            CreditScore = creditScore;
            SalaryURL = salaryURL;
            Salary2URL = salary2URL;
            Salary3URL = salary3URL;
            ProofOfAddressURL = proofOfAddressURL;
        }
    }
    public class DetailsLoanReqQueryResponse : DetailLoanReqBase
    {
        public DetailsLoanReqQueryResponse(string name, string lastName, string dNI, string cUIT, string email, string phoneNumber, int creditScore, string salaryURL, string salary2URL, string salary3URL, string proofOfAddressURL, decimal lotCost, decimal downPayment, int quotasCount, DetailLoanReqGuaQueryResponse guarantor1, DetailLoanReqGuaQueryResponse guarantor2) : base(name, lastName, dNI, cUIT, email, phoneNumber, creditScore, salaryURL, salary2URL, salary3URL, proofOfAddressURL)
        {
            LotCost = lotCost;
            DownPayment = downPayment;
            QuotasCount = quotasCount;
            Guarantor1 = guarantor1;
            Guarantor2 = guarantor2;
        }

        public decimal LotCost { get; set; }
        public decimal DownPayment { get; set; }
        public int QuotasCount { get; set; }
        public DetailLoanReqGuaQueryResponse Guarantor1 { get; set; }
        public DetailLoanReqGuaQueryResponse Guarantor2 { get; set; }

    }
    public class DetailLoanReqGuaQueryResponse : DetailLoanReqBase
    {
        public DetailLoanReqGuaQueryResponse(string name, string lastName, string dNI, string cUIT, string email, string phoneNumber, int creditScore, string salaryURL, string salary2URL, string salary3URL, string proofOfAddressURL, string selfieURL, string frontDNIURL, string backDNIURL) : base(name, lastName, dNI, cUIT, email, phoneNumber, creditScore, salaryURL, salary2URL, salary3URL, proofOfAddressURL)
        {
            SelfieURL = selfieURL;
            FrontDNIURL = frontDNIURL;
            BackDNIURL = backDNIURL;
        }

        public string SelfieURL { get; set; }
        public string FrontDNIURL { get; set; }
        public string BackDNIURL { get; set; }

    }
}
