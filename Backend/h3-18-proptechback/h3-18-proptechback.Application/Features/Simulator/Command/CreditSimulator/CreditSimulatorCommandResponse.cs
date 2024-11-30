namespace h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator
{
    public class CreditSimulatorCommandResponse
    {
        public CreditSimulatorCommandResponse(decimal minimumSalary, decimal interestRate, decimal totalPayment, decimal paymentMonth, decimal financingAmount)
        {
            MinimumSalary = minimumSalary;
            InterestRate = interestRate;
            TotalPayment = totalPayment;
            PaymentMonth = paymentMonth;
            FinancingAmount = financingAmount;
        }

        public decimal MinimumSalary { get; set; }
        public decimal InterestRate { get; set; }
        public decimal TotalPayment { get; set; }
        public decimal PaymentMonth { get; set; }
        public decimal FinancingAmount { get; set; }

    }
}
