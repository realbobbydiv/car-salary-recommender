namespace SalaryCars.Api.Domain
{
    public class CarRecommendation
    {
        public string Title { get; set; } = string.Empty;

        public decimal EstimatedMonthlyCost { get; set; }

        public decimal PercentOfSalary { get; set; }

        public decimal PercentOfBudget { get; set; }

        public string Tier { get; set; } = string.Empty;
    }
}