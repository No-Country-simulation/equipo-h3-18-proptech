namespace h3_18_proptechback.Application.Features.DataUserValue.Command.UpdateUser
{
    public class UpdateUserCommandResponse
    {
        public string Message { get; set; }
        public string RefreshToken { get; set; }
        public UpdateUserCommandResponse(string message, string refreshToken)
        {
            Message = message;
            RefreshToken = refreshToken;
        }
    }
}
