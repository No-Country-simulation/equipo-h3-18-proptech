using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.Loan.Queries.Common
{
    public static class PaginationHelper
    {
        public static (int totalItems, int totalPages, List<Quota> quotas) Pagination(DetailsLoanQuery query, List<Quota> quotas)
        {
            var result = quotas.OrderBy(q=>q.QuotaNumber)
                .Skip((query.Page - 1) * 6)
                .Take(6).ToList();

            if (query.StateQuota is not null)
                result = result.Where(l => l.State == query.StateQuota).ToList();
            var totalItems = quotas.Count();
            var division = totalItems / 6m;

            var totalPages = (int)Math.Ceiling(division);
            return (totalItems, totalPages, result);
        }
    }
}
