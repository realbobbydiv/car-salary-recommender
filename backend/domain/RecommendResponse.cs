namespace SalaryCars.Api.Domain
{
    public class RecommendResponse
    {
        public decimal MonthlySalary { get; set; }
        public List<CarRecommendation> Top3 { get; set; } = new();
    }

    public class CarRecommendation
    {
        public string Title { get; set; } = string.Empty;
        public decimal EstimatedMonthlyCost { get; set; }
        public decimal PercentOfSalary { get; set; }
        public string Tier { get; set; } = string.Empty;
    }
}
