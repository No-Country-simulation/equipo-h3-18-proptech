using h3_18_proptechback.CreditRecord.Models.Requets;


namespace h3_18_proptechback.Application.Contracts.Infrastructure.CreditRecord
{
    public interface ICreditRecordServices<T>
    {
        Task<List<T>?> ObtenerDeudas(DeudasRequest request);

        Task<List<T>> ObtenerHistoria(DeudasRequest request);

        Task<List<T>> ObtenerChequesRechazados(DeudasRequest request);

    }
}
