using Microsoft.AspNetCore.Mvc;
namespace estimatesvc.Controllers;

[ApiController]
[Route("/")]
public class EstimateController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<EstimateController> _logger;

    public EstimateController(ILogger<EstimateController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetEstimate")]
    public IEnumerable<Estimate> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Estimate
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
