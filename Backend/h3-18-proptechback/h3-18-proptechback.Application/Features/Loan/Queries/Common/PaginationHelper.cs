using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Features.Loan.Queries.Common
{
    public static class PaginationHelper
    {
        public static (int totalItems, int totalPages, List<Quota> quotas) Pagination(DetailsLoanQuery query, List<Quota> quotas)
        {
            List<Quota> result = quotas;
            if(query.StateQuota is not null)
                result = quotas.Where(l=>l.State == query.StateQuota).ToList();

            result = result.OrderBy(q=>q.QuotaNumber)
                .Skip((query.Page - 1) * 6)
                .Take(6).ToList();
            var totalItems = quotas.Count();
            var division = totalItems / 6m;

            var totalPages = (int)Math.Ceiling(division);
            return (totalItems, totalPages, result);
        }
    }
}
