﻿using AutoMapper;
using h3_18_proptechback.Application.Contracts.Persistence.DataUsers;
using h3_18_proptechback.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.DataUserValue.Queries
{
    public class DataUserQueriesHandler
    {
        private readonly IDataUserRepository _dataRepo;
        private readonly IMapper _mapper;

        public DataUserQueriesHandler(IDataUserRepository dataRepo)
        {
            _dataRepo = dataRepo;
        }

        //public IEnumerable<VMDataUser> GetAll()
        //{
            
        //   var list = _dataRepo.GetAll();

        //    var result = new VMDataUser
        //    {
        //        CUIT = _mapper.Map<VMDataUser>(list).CUIT,
        //        DNI = _mapper.Map<VMDataUser>(list).DNI,
        //        IsComplete = _mapper.Map<VMDataUser>(list).IsComplete,
        //    };


        //    return ;
        //}

        public async Task<VMDataUser> GetIdAsync(Guid id)
        {
            var resul =  await _dataRepo.GetIdAsync(id);

            return _mapper.Map<VMDataUser>(resul);
        }

        public async Task<bool> IsValueUser(DataUser entity)
        {
            return await _dataRepo.IsValueUser(entity);
        }
    }
}