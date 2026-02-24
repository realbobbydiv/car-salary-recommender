using Microsoft.AspNetCore.Mvc;
using SalaryCars.Api.Domain;
using SalaryCars.Api.Data;
using System;
using System.IO;
using System.Linq;

namespace SalaryCars.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendController : ControllerBase
    {
        [HttpPost]
        public IActionResult Recommend([FromBody] RecommendRequest request)
        {
            if (request == null)
                return BadRequest("Request body required");

            if (request.Salary <= 0)
                return BadRequest("Monthly salary must be greater than 0");

            if (request.MonthlyCarBudget <= 0)
                return BadRequest("Monthly car budget must be greater than 0");

            var monthlySalary = Math.Round(request.Salary, 2);
            var annualSalary = Math.Round(monthlySalary * 12m, 2);
            var monthlyCarBudget = Math.Round(request.MonthlyCarBudget, 2);

            var dataPath = Path.Combine(AppContext.BaseDirectory, "Data", "cars.seed.json");
            var cars = SeedLoader.Load(dataPath)
                .Where(c => c.Year >= request.DesiredYear)
                .ToList();

            var recommendations = cars
                .Select(c =>
                {
                    //  5 years of loan for example
                    var monthlyCost = Math.Round(c.Price / 60m, 2);

                    var tier =
                        monthlyCost <= monthlyCarBudget ? "Comfortable" :
                        monthlyCost <= monthlyCarBudget * 1.2m ? "Borderline" :
                        "Risky";

                    // how much percent of the budget this car would take
                    var percentOfBudget = Math.Round((monthlyCost / monthlySalary) * 100m, 1);

                    return new CarRecommendation
                    {
                        Title = $"{c.Make} {c.Model}",
                        EstimatedMonthlyCost = monthlyCost,
                        PercentOfSalary = percentOfBudget, 
                        Tier = tier
                    };
                })
                // getting the 3 cars closest to the user's budget
                .OrderBy(r => Math.Abs(r.EstimatedMonthlyCost - monthlyCarBudget))
                .Take(3)
                .ToList();

            var response = new RecommendResponse
            {
                MonthlySalary = monthlySalary,
                AnnualSalary = annualSalary,          
                MonthlyCarBudget = monthlyCarBudget,  
                Top3 = recommendations
            };

            return Ok(response);
        }
    }
}