using FluentValidation;

namespace h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser
{
    public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
    {
        public UpdateUserCommandValidator()
        {
            RuleFor(command => command.Email)
                .NotEmpty().WithMessage("El correo electrónico es requerido.")
                .EmailAddress().WithMessage("El correo electrónico no tiene un formato válido.");

            RuleFor(command => command.PhoneNumber)
                .NotEmpty().WithMessage("El número de teléfono es requerido.")
                .Matches(@"^((\+[\d]{1,3})?)\s?([\d]{1,5})\s?([\d][\s.-]?){6,7}$")
                .WithMessage("El número de teléfono no tiene un formato válido.");
        }
    }
}
