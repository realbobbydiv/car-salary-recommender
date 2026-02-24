namespace SalaryCars.Api.Domain
{
    public class RecommendRequest
    {
        public decimal Salary { get; set; }
        public int DesiredYear { get; set; }
        public decimal MonthlyCarBudget { get; set; }
    }
}
