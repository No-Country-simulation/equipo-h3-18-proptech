using h3_18_proptechback.Domain.Common;

namespace h3_18_proptechback.Domain
{
    public class DataUser : BaseEntity
    {
        public Guid UserID { get; set; }
        public string? DNI { get; set; }
        public string CUIT { get; set; }
        public string? PassportID { get; set; }
        public bool IsComplete { get; set; }    
        public ICollection<DocumentsUser> DocumentsUsers { get; set; }
    }
}
