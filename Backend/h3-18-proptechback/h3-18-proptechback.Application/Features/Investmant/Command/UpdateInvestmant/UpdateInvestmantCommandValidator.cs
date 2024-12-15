using FluentValidation;
using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.Investmant.Command.UpdateInvestmant
{
    public class UpdateInvestmantCommandValidator: AbstractValidator<UpdateInvestmantCommand>
    {
        public UpdateInvestmantCommandValidator()
        {
            RuleFor(x => x.Id).NotNull().WithMessage("Debe colocar el Guid Id es Requerido");

            RuleFor(x => x.CaptialIntial).NotNull().WithMessage("El Capital incial es Requerido")
                    .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal")
                    .Must(x => x < 0).WithMessage("El valor debe ser mayor a 0");

            RuleFor(x => x.Dateinitial).NotNull().WithMessage("Se requiere una fecha de inicio para inciar los calculos");

            RuleFor(x => x.Isactive).NotNull().WithMessage("Se requiere saber si el prestamo esta activo");

            RuleFor(x => x.IsPayed).NotNull().WithMessage("Se requiere saber ya el pago esta realizado ");
            RuleFor(x => x.returnInvestmant).PrecisionScale(18, 2, false);
        }
    }
}
