using System.Collections.Generic;

namespace SalaryCars.Api.Domain
{
    public class RecommendResponse
    {
        public decimal MonthlySalary { get; set; }
        public List<CarRecommendation> Top3 { get; set; } = new();
        public string? Recommendation { get; set; }
        public decimal AnnualSalary { get; set; }
        public decimal MonthlyCarBudget { get; set; }
    }
}
