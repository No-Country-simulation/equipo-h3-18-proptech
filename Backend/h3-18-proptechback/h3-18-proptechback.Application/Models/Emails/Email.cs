namespace h3_18_proptechback.Application.Models.Emails
{
    public class Email
    {
        public string TO {  get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public string? BodyHTML { get; set; } = null;
    }
}