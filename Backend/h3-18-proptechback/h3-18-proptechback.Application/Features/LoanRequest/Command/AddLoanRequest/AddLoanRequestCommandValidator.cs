using FluentValidation;
using h3_18_proptechback.Application.Features.CalculatorCredit;

namespace h3_18_proptechback.Application.Features.LoanRequest.Command.AddLoanRequest
{
    public class AddLoanRequestCommandValidator : AbstractValidator<AddLoanRequestCommand>
    {
        public AddLoanRequestCommandValidator()
        {
            RuleFor(x => x.Salary).NotNull().WithMessage("El archivo de salario es obligatorio.");
            RuleFor(x => x.Salary2).NotNull().WithMessage("El segundo archivo de salario es obligatorio.");
            RuleFor(x => x.Salary3).NotNull().WithMessage("El tercer archivo de salario es obligatorio.");
            RuleFor(x => x.ProofOfAddress).NotNull().WithMessage("El comprobante de domicilio es obligatorio.");

            RuleFor(x => x.CBU)
                .NotEmpty().WithMessage("El CBU es obligatorio.")
                .Matches(@"^\d{22}$").WithMessage("El CBU debe tener 22 dígitos.");

            RuleFor(x => x.LotCost)
                .GreaterThan(0).WithMessage("El costo del lote debe ser mayor a 0.");

            RuleFor(x => x.DownPayment)
                .GreaterThanOrEqualTo(0).WithMessage("El anticipo no puede ser negativo.")
                .LessThanOrEqualTo(x => x.LotCost).WithMessage("El anticipo no puede ser mayor al costo del lote.");

            RuleFor(x => x.QuotasCount)
                .Must(quotas => FinancingCalculator.MonthlyRefValues.ContainsKey(quotas))
                .WithMessage("La cantidad de cuotas no es válida. Debe estar entre las opciones predefinidas (6, 9, 12, ..., 180).");

            RuleFor(x => x.Guarantor1).NotNull().WithMessage("El primer garante es obligatorio.")
                .SetValidator(new AddLoanRequestGuaCommandCommandValidator());

            RuleFor(x => x.Guarantor2).NotNull().WithMessage("El segundo garante es obligatorio.")
                .SetValidator(new AddLoanRequestGuaCommandCommandValidator());
        }
    }
    public class AddLoanRequestGuaCommandCommandValidator : AbstractValidator<AddLoanRequestGuaCommand>
    {
        public AddLoanRequestGuaCommandCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(100).WithMessage("El nombre no puede exceder los 100 caracteres.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("El apellido es obligatorio.")
                .MaximumLength(100).WithMessage("El apellido no puede exceder los 100 caracteres.");

            RuleFor(x => x.DNI)
                .NotEmpty().WithMessage("El DNI es obligatorio.")
                .Length(7, 8).WithMessage("El DNI debe tener entre 7 y 8 caracteres.");

            RuleFor(x => x.CUIT)
                .NotEmpty().WithMessage("El CUIT es obligatorio.")
                .Matches(@"^\d{11}$").WithMessage("El CUIT debe tener 11 dígitos.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("El correo electrónico es obligatorio.")
                .EmailAddress().WithMessage("El formato del correo electrónico no es válido.");

            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("El número de teléfono es requerido.")
                .Matches(@"^((\+[\d]{1,3})?)\s?([\d]{1,5})\s?([\d][\s.-]?){6,7}$")
                .WithMessage("El número de teléfono no tiene un formato válido.");

            RuleFor(x => x.Photo).NotNull().WithMessage("La foto es obligatoria.");
            RuleFor(x => x.Front).NotNull().WithMessage("La foto del frente del DNI es obligatoria.");
            RuleFor(x => x.Back).NotNull().WithMessage("La foto del reverso del DNI es obligatoria.");
            RuleFor(x => x.Salary).NotNull().WithMessage("El archivo de salario es obligatorio.");
            RuleFor(x => x.Salary2).NotNull().WithMessage("El segundo archivo de salario es obligatorio.");
            RuleFor(x => x.Salary3).NotNull().WithMessage("El tercer archivo de salario es obligatorio.");
            RuleFor(x => x.ProofOfAddress).NotNull().WithMessage("El comprobante de domicilio es obligatorio.");
        }
    }
}
