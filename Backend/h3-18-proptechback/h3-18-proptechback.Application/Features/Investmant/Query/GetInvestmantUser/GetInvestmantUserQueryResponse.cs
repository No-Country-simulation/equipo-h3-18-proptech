namespace h3_18_proptechback.Application.Features.Investmant.Query.GetInvestmantUser
{
    public class GetInvestmantUserQueryResponse
    {
        public decimal CurrentAmount { get; set; }
        public DateTime InitDate { get; set; }
        public decimal Profit { get; set; }
        public List<GetItemUserQueryResponse> History { get; set; }
        public GetInvestmantUserQueryResponse(decimal currentAmount, DateTime initDate, decimal profit, List<GetItemUserQueryResponse> history)
        {
            CurrentAmount = currentAmount;
            InitDate = initDate;
            Profit = profit;
            History = history;
        }
    }

    public class GetItemUserQueryResponse
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public decimal Profit { get; set; }

        public GetItemUserQueryResponse(int year, int month, decimal profit)
        {
            Year = year;
            Month = month;
            Profit = profit;
        }
    }
}