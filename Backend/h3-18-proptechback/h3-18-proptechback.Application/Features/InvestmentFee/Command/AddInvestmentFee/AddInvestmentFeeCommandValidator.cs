using FluentValidation;>
using h3_18_proptechback.Application.Features.Investmant.Command.AddInvestmant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace h3_18_proptechback.Application.Features.InvestmentFee.Command.AddInvestmentFee
{
    public class AddInvestmentFeeCommandValidator: AbstractValidator<AddInvestmentFeeCommand>
    {
        public AddInvestmentFeeCommandValidator()
        {
            RuleFor(x => x.InvestmantId).NotNull().WithMessage("Es requerido el Guid de inversor");
            RuleFor(x => x.IntialCapital).NotNull().WithMessage("El Capital incial es Requerido")
                .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal")
                .Must(x => x > 0).WithMessage("El valor debe ser mayor a 0");
            RuleFor(x => x.DateInitShare).NotNull().WithMessage("Se requiere una fecha de inicio para inciar los calculos del mes");
            RuleFor(x => x.DateCloseShare).NotNull().WithMessage("Se requiere una fecha del cierre para establecer el aporte de intereses");
            RuleFor(x => x.Moth).NotNull().WithMessage("Se requiere indique el numero de mes iniciando en 0 para enero y 11 para diciembre")
                .InclusiveBetween(0, 11).WithMessage("El número debe estar entre 0 y 11");
            RuleFor(x => x.MonthlyInterest).NotNull().WithMessage("El monto de interes es Requerido")
                .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal");
            RuleFor(x => x.Share).NotNull().WithMessage("El monto de cuota a abonar es Requerido")
                .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal");
            RuleFor(x => x.capitalization).NotNull().WithMessage("El monto que reflaja la capitalizacion mensual es requerida")
                .PrecisionScale(18, 2, false).WithMessage("Se requiere un dato decimal");
        }

    }
}
