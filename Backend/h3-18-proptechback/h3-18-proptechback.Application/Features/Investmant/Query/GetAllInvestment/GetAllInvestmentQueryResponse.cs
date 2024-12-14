namespace h3_18_proptechback.Application.Features.Investmant.Query.GetAllInvestment
{
    public class GetAllInvestmentQueryResponse
    {
        public string FullName { get; set; }
        public decimal InvestAmount { get; set; }
        public int ActiveMonths { get; set; }
        public string DNI { get; set; }
        public GetAllInvestmentQueryResponse(string fullName, decimal investAmount, int activeMonths, string dNI)
        {
            FullName = fullName;
            InvestAmount = investAmount;
            ActiveMonths = activeMonths;
            DNI = dNI;
        }
    }
}
