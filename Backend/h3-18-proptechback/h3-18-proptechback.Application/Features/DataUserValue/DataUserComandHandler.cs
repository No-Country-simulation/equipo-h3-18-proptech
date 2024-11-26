using h3_18_proptechback.Application.Contracts.Persistence;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public Task Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Domain.DataUser?> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Domain.DataUser> GetIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsValueUser()
        {
            throw new NotImplementedException();
        }

        
    }
}
