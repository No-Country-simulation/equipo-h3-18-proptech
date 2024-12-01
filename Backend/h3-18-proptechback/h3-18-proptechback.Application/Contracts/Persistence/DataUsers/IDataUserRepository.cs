using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Contracts.Persistence.DataUsers
{
    public interface IDataUserRepository: IGenericRepository<DataUser>
    {
        Task<bool> IsValueUser(DataUser entity); 
    }
}
