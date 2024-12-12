namespace h3_18_proptechback.Application.Features.CalculatorCredit
{
    public class FinancingCalculator
    {
        public static readonly Dictionary<int, decimal> MonthlyRefValues = new Dictionary<int, decimal>(15)
        {
            {6, 0.184496m},
            {9, 0.125780m},
            {12, 0.096453m},
            {18, 0.067190m},
            {24, 0.055246m},
            {30, 0.043922m},
            {36, 0.038157m},
            {48, 0.031049m},
            {60, 0.026880m},
            {72, 0.024171m},
            {84, 0.022302m},
            {96, 0.020948m},
            {120, 0.019173m},
            {150, 0.017913m},
            {180, 0.017199m}
        };

        public FinancingCalculator(decimal lotCost, decimal downPayment, int quotasCount)
        {
            LotCost = lotCost;
            DownPayment = downPayment;
            QuotasCount = quotasCount;
        }
        public readonly decimal LotCost;
        public readonly decimal DownPayment;
        public readonly int QuotasCount;
        public decimal FinancingAmount => LotCost - DownPayment;
        public decimal InteresRate() => ((GetMonthValue() * QuotasCount * GetDiscount())-1m) * 100m;
        public decimal GetDiscount()
        {
            if (DownPayment >= (30m * LotCost) / 100m)
                return 1;
            else if (QuotasCount <= 30m)
                return 1.075m;
            else
                return 1.15m;
        }

        public ListType GetList()
        {
            if (DownPayment >= (30m * LotCost) / 100m)
                return ListType.Gold;
            else if (QuotasCount <= 30m)
                return ListType.SilverPlus;
            else
                return ListType.Silver;
        }
        public decimal PaymentMonth() => GetMonthValue() * FinancingAmount * GetDiscount();
        public decimal MinimumSalary() => PaymentMonth() * 4m;
        public decimal TotalPayment()
        {
            var interestAmount = (FinancingAmount * InteresRate()) / 100m;
            return FinancingAmount + interestAmount;
        }
        public decimal GetMonthValue()
        {
            if (MonthlyRefValues.ContainsKey(QuotasCount))
                return MonthlyRefValues[QuotasCount];
            throw new ArgumentException("La cantidad de cuotas asignada no es valida.");
        }
    }

    public enum ListType
    {
        Gold,
        SilverPlus,
        Silver

    }
}