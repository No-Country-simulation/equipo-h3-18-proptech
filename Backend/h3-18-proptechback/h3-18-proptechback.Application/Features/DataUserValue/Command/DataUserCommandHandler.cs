using AutoMapper;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Domain;


namespace h3_18_proptechback.Application.Features.DataUserValue.Command
{
    public class DataUserCommandHandler
    {
        private readonly IDataUserRepository _dataRepo;
        private readonly IMapper _mapper;

        public DataUserCommandHandler(IDataUserRepository dataRepo)
        {
            _dataRepo = dataRepo;
        }
        public async Task<VMDataUser> Add(DataUser entity)
        {
            if (entity == null)
            {
                throw new Exception($"No se permiten Campos vacios {entity}");
            }

            await _dataRepo.Add(entity);

            var newDataUser = new VMDataUser
            {
                CUIT = entity.CUIT,
                DNI = entity.DNI,
                IsComplete = entity.IsComplete,
            };

            

            return _mapper.Map<VMDataUser>(newDataUser);

        }

        public async Task<VMDataUser> Update(DataUser entity)
        {
            var existe = _dataRepo.GetIdAsync(entity.ID);

            if (existe == null)
                throw new Exception($"el registro{entity.DNI} no existe");

            await _dataRepo.Update(entity);

            var newDataUser = new VMDataUser
            {
                CUIT = entity.CUIT,
                DNI = entity.DNI,
                IsComplete = entity.IsComplete,
            };

            return _mapper.Map<VMDataUser>(newDataUser);
        }

        public async Task<bool> Delete(Guid id)
        {
            var existe = _dataRepo.GetIdAsync(id);
            if (existe == null)
            {
                throw new Exception($"el registro{id} no existe");

            }
            await _dataRepo.Delete(id);
            return true;
        }

    }
}
