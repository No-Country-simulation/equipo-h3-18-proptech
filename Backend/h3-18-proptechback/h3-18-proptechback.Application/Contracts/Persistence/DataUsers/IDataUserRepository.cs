using h3_18_proptechback.Domain;

namespace h3_18_proptechback.Application.Contracts.Persistence.DataUsers
{
    public interface IDataUserRepository: IGenericRepository<DataUser>
    {
        Task<bool> IsValueUser(DataUser entity);
        Task ValidateUser(string DNI);
        Task RejectUser(string DNI);
        Task<bool> IsValidUserByDNI(string DNI);
        Task<DataUser?> GetUserByGuidIdentity(string id);
        Task<bool> IsMine(string DNI, string idUser);
        IQueryable<DataUser> GetDataUserPending();
    }
}
