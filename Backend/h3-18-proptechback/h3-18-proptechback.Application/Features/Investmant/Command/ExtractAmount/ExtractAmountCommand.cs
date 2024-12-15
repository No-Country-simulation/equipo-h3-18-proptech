using FluentValidation;

namespace h3_18_proptechback.Application.Features.Investmant.Command.ExtractAmount
{
    public class ExtractAmountCommand
    {
        public decimal Amount { get; set; } 
    }

    public class ExtractAmountCommandValidator : AbstractValidator<ExtractAmountCommand>
    {
        public ExtractAmountCommandValidator()
        {
            RuleFor(x => x.Amount).NotNull().WithMessage("El monto es requerido")
           .Must(x => x > 0).WithMessage("El valor debe ser mayor a 0");
        }
    }
}
