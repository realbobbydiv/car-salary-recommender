using Microsoft.AspNetCore.Mvc;
using SalaryCars.Api.Data;

namespace SalaryCars.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var dataPath = Path.Combine(AppContext.BaseDirectory, "Data", "cars.seed.json");
            var cars = SeedLoader.Load(dataPath);

            return Ok(cars);
        }
    }
}