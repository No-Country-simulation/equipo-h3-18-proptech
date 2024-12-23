﻿
using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DataGuarantor : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DNI { get; set; }
        public string CUIT { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Guid LoanRequestId {  get; set; }
        public LoanRequest LoanRequest { get; set; }
    }
}
