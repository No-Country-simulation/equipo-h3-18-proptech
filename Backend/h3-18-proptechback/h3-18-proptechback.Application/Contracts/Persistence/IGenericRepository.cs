

namespace h3_18_proptechback.Application.Contracts.Persistence
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T?> GetAll();

        Task<T?> GetIdAsync(Guid id);

        Task<T> Add(T entity);
        
        Task<T> Update(T entity);
        
        Task<bool> Delete(Guid id);
    }
}
