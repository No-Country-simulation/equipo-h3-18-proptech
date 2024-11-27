using h3_18_proptechback.Application.Contracts.Persistence;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;


namespace h3_18_proptechback.Application.Features.DataUser
{
    public class DataUserComandHandler : IDataUserRepository
    {
        private readonly IDataUserRepository _dataRepo;

        public DataUserComandHandler(IDataUserRepository dataRepo)
        {
            _dataRepo = dataRepo;
        }

        public async Task<Domain.DataUser> Add(Domain.DataUser entity)
        {
            if (entity == null) 
            {
                throw new Exception($"No se permiten Campos vacios {entity}");
            }
            
            
            return await _dataRepo.Add(entity);
            
        }

        public async Task<Domain.DataUser> Update(Domain.DataUser entity)
        {
            var existe = _dataRepo.GetIdAsync(entity.ID);

            if (existe == null)
                throw new Exception($"el registro{entity.DNI} no existe");
            
            return await _dataRepo.Update(entity);
        }

        public async Task<bool> Delete(Guid id)
        {
            var existe = _dataRepo.GetIdAsync(id);
            if (existe == null) { 
                throw new Exception($"el registro{id} no existe");
            
            }
            await _dataRepo.Delete(id);
            return true; 
        }

        public IEnumerable<Domain.DataUser?> GetAll()
        {
             return _dataRepo.GetAll();
        }

        public async Task<Domain.DataUser> GetIdAsync(Guid id)
        {
            return await _dataRepo.GetIdAsync(id);
        }

        public async Task<bool> IsValueUser(Domain.DataUser entity)
        {
            return await _dataRepo.IsValueUser(entity);
        }
    }
}
