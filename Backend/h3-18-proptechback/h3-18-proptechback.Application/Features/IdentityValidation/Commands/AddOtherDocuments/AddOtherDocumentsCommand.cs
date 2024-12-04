using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddOtherDocuments
{
    public class AddOtherDocumentsCommand
    {
        public string Photo { get; set; }
        public string Front { get; set; }
        public string Back { get; set; }
        public string DNI { get; set; }
        public IFormFile Salary { get; set; }
        public IFormFile Salary2 { get; set; }
        public IFormFile Salary3 { get; set; }
        public IFormFile ProofOfAddress { get; set; }
        public AddOtherDocumentsCommand()
        {

        }
        public AddOtherDocumentsCommand(string photo, string front, string back, string DNI, IFormFile salary, IFormFile salary2, IFormFile salary3, IFormFile proofOfAddress)
        {
            Front = front;
            Back = back;
            Photo = photo;
            this.DNI = DNI;
            Salary = salary;
            Salary2 = salary2;
            Salary3 = salary3;
            ProofOfAddress = proofOfAddress;
        }
    }
}
