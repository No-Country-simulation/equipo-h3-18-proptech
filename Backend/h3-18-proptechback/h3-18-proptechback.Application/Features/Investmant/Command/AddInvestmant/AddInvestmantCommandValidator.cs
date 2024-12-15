using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant
{
    public class AddInvestmantCommandValidator: AbstractValidator<AddInvestmantCommand>
    {
        public AddInvestmantCommandValidator()
        {
            RuleFor(x => x.Amount).NotNull().WithMessage("El monto es requerido")
            .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal")
            .Must(x => x > 0).WithMessage("El valor debe ser mayor a 0");
        }
    }
}
