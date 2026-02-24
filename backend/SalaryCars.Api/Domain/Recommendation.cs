namespace SalaryCars.Api.Domain
{
    public class Recommendation
    {
        public int CarId { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}
