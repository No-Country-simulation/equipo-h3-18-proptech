using FluentValidation;
using h3_18_proptechback.Application.Features.CalculatorCredit;

namespace h3_18_proptechback.Application.Features.Simulator.Command.CreditSimulator
{
    public class CreditSimulatorCommandValidator : AbstractValidator<CreditSimulatorCommand>
    {

        public CreditSimulatorCommandValidator()
        {
            RuleFor(x => x.LotCost)
                .GreaterThan(0)
                .WithMessage("El costo del lote debe ser mayor a 0.");

            RuleFor(x => x.DownPayment)
                .GreaterThanOrEqualTo(0)
                .WithMessage("El adelanto no puede ser menor a 0.")
                .LessThanOrEqualTo(x => x.LotCost)
                .WithMessage("El adelanto no puede ser mayor al costo del lote.");

            RuleFor(x => x.QuotasCount)
                .Must(quotas => Calculator.MonthlyRefValues.ContainsKey(quotas))
                .WithMessage("La cantidad de cuotas no es válida. Debe estar entre las opciones predefinidas (6, 9, 12, ..., 180).");

        }


    }
}