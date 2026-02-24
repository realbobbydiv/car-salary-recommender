using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using SalaryCars.Api.Domain;

namespace SalaryCars.Api.Data
{
    public static class SeedLoader
    {
        public static IEnumerable<Car> Load(string path)
        {
            if (!File.Exists(path))
                return new List<Car>();

            var json = File.ReadAllText(path);

            try
            {
                var opts = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                return JsonSerializer.Deserialize<List<Car>>(json, opts) ?? new List<Car>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("SeedLoader ERROR:");
                Console.WriteLine(ex.ToString());
                return new List<Car>();
            }
        }
    }
}