using SalaryCars.Api.Domain;
using System.Collections.Generic;

namespace SalaryCars.Api.Services
{
    public class Recommender
    {
        public RecommendResponse Recommend(RecommendRequest request, IEnumerable<Car> cars)
        {
            // simple placeholder logic
            var response = new RecommendResponse { Recommendation = "No suitable car found." };
            return response;
        }
    }
}
