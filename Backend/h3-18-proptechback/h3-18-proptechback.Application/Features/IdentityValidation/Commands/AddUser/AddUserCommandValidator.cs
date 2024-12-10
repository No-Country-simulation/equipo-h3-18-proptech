using FluentValidation;

namespace h3_18_proptechback.Application.Features.IdentityValidation.Commands.AddUser
{
    public class AddUserCommandValidator : AbstractValidator<AddUserCommand>
    {
        public AddUserCommandValidator()
        {
            RuleFor(x => x.DNI)
                .NotEmpty().WithMessage("El DNI es obligatorio.")
                .Length(7, 8).WithMessage("El DNI debe tener entre 7 y 8 caracteres.");

            RuleFor(x => x.CUIT)
                .NotEmpty().WithMessage("El CUIT es obligatorio.")
                .Matches(@"^\d{11}$").WithMessage("El CUIT debe tener 11 dígitos y solo contener números.");

            RuleFor(x => x.Photo)
                .NotNull().WithMessage("La foto es obligatoria.");

            RuleFor(x => x.Front)
                .NotNull().WithMessage("La foto del frente del documento es obligatoria.");

            RuleFor(x => x.Back)
                .NotNull().WithMessage("La foto del reverso del documento es obligatoria.");
        }
    }
}
