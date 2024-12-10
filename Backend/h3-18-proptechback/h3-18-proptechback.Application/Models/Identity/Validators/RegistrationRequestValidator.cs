using FluentValidation;

namespace h3_18_proptechback.Application.Models.Identity.Validators
{
    public class RegistrationRequestValidator : AbstractValidator<RegistrationRequest>
    {
        private readonly List<string> AllowedRoles = new List<string>
        {
            "Administrador",
            "Operador",
            "Cliente",
            "Inversor"
        };
        public RegistrationRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("El nombre es obligatorio.")
                .MaximumLength(50).WithMessage("El nombre no debe exceder los 50 caracteres.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("El apellido son obligatorios.")
                .MaximumLength(50).WithMessage("El apellido no deben exceder los 50 caracteres.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("El correo electrónico es obligatorio.")
                .EmailAddress().WithMessage("El formato del correo electrónico no es válido.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("La contraseña es obligatoria.")
                .MinimumLength(6).WithMessage("La contraseña debe tener al menos 6 caracteres.")
                .Matches("[A-Z]").WithMessage("La contraseña debe contener al menos una letra mayúscula.")
                .Matches("[a-z]").WithMessage("La contraseña debe contener al menos una letra minúscula.")
                .Matches("[0-9]").WithMessage("La contraseña debe contener al menos un dígito.")
                .Matches("[^a-zA-Z0-9]").WithMessage("La contraseña debe contener al menos un carácter especial.");

            RuleFor(command => command.PhoneNumber)
                .NotEmpty().WithMessage("El número de teléfono es requerido.")
                .Matches(@"^((\+[\d]{1,3})?)\s?([\d]{1,5})\s?([\d][\s.-]?){6,7}$")
                .WithMessage("El número de teléfono no tiene un formato válido.");

            RuleFor(x => x.rol)
            .NotEmpty().WithMessage("El rol es obligatorio.")
            .Must(role => AllowedRoles.Contains(role))
            .WithMessage($"El rol debe ser uno de los siguientes: {string.Join(", ", AllowedRoles)}.");
        }
    }
}
